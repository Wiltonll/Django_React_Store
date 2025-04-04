from django.core import paginator
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  
from rest_framework.response import Response
from rest_framework.serializers import Serializer


from api.models import *
from api.serializers import ProductSerializer


@api_view(['GET'])
def getProducts(request):
    query = request.GET.get('keyword', '')  

    products = Product.objects.filter(name__icontains=query).order_by('id')  
    page = request.GET.get('page', 1)
    
    try:
        page = int(page)  
    except ValueError:
        page = 1  # Se falhar, assume que é a página 1

    paginator = Paginator(products, 8) 

    try:
        products_paginated = paginator.page(page)
    except PageNotAnInteger:
        products_paginated = paginator.page(1)
    except EmptyPage:
        products_paginated = paginator.page(paginator.num_pages)

    serializer = ProductSerializer(products_paginated, many=True)

    return Response({
        "products": serializer.data,
        "page": page,
        "pages": paginator.num_pages
    })



@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    
 
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'Atencao': 'Produto já revisado'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

 
    elif data['rating'] == 0:
        content = {'Atencao': 'Selecione uma classificação'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response('Revisão adicionada')
    
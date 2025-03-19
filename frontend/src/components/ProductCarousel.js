import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { fetchTopRatedProducts } from "../redux/slices/productSlice";
import banner1 from "../assets/banner1.jpg"; 
import banner2 from "../assets/banner2.jpg"; 
import banner3 from "../assets/banner3.jpg";  
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg"; 

function ProductCarousel() {
  const dispatch = useDispatch();
  const topRatedProducts = useSelector((state) => state.product.topRatedProducts);
  const { error, loading, products } = topRatedProducts;

  useEffect(() => {
    dispatch(fetchTopRatedProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel fade pause="hover" className="carousel-container" interval={5000}>
      <Carousel.Item>
        <Link to={`/product/iphone-id`}> 
          <img src={banner1} alt="" className="d-block w-100" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to={`/product/mouse-id`}>
          <img src={banner2} alt="" className="d-block w-100" />
        </Link>
      </Carousel.Item>
      
      <Carousel.Item>
        <Link to={`/product/mouse-id`}>
          <img src={banner3} alt="" className="d-block w-100" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to={`/product/mouse-id`}>
          <img src={banner4} alt="" className="d-block w-100" />
        </Link>
      </Carousel.Item>

      <Carousel.Item>
        <Link to={`/product/mouse-id`}>
          <img src={banner5} alt="" className="d-block w-100" />
        </Link>
      </Carousel.Item>


    </Carousel>
  );
}

export default ProductCarousel;

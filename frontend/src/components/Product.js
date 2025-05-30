import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Paper 
      sx={{ 
        width: 250, 
        height: 400,
        maxWidth: 345, 
        margin: "5px", 
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.8)",
          border: "2px solid black",
        }
      }}
    >
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain", height: 180 }}
          image={product.image}
          alt={product.name}
        />
        <CardContent style={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ minHeight: 50 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} component="div">
            <Rating 
              value={product.rating}
              text={`${product.numReviews} Avaliações`}
              color="#f8e825"
            />
          </Typography>
          <Typography variant="h6" component="div">
            R${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
}

export default Product;

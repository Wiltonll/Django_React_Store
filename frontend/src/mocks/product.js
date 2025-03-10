import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";
class ProductAPI {
  async getProductList(keyword= '' , pageNumber = '') {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/`, {
        params: { keyword, page: pageNumber }
      });
      console.log("Dados recebidos da API:", data);  // Verifica se a API está retornando corretamente
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
  
  async getProductDetails(productId) {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
      console.log(data)
      return data;      
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async createProductReview(productId, review) {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/reviews/`,
        review,
        config
      );
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }

  async getTopRatedProducts() {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/top/`);
      return data;
    } catch (error) {
      throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }
  }
}
const Product = ({ product }) => {
  return (
    <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />   </div>
        );
      };
      
const productAPI = new ProductAPI();

export default productAPI;
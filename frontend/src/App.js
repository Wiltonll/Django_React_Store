import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

import { HashRouter as Router, Route } from 'react-router-dom';
import Star from "./components/Star";
  

function App() {
  return (
    <Router>
      { }
      <div style={{ position: "sticky", top: 0, zIndex: "100" }} ><Header /></div>
      <Container>
        <main className="py-3">
          <Route exact path="/" component={HomeScreen} />
          <Route path="/page/:pageNumber" component={HomeScreen} />

          <Route path="/login" component={LoginScreen} />

          <Route path="/register" component={RegisterScreen} />

          <Route path="/profile" component={ProfileScreen} />

          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/payment" component={PaymentScreen} />

          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/orderDetail" component={OrderScreen} />

          <Route path="/product/:id" component={ProductScreen} />

          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/star" component={Star} />


          { }

          { }

          { }

          { }

          { }
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
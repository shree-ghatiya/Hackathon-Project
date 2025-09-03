import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

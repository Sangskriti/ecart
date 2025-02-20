import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Wishlist from "./components/WishList";  // Import Wishlist Component
import { items as initialItems } from "./components/Data";

const App = () => {
  const [data, setData] = useState([...initialItems]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // 🔥 Add Wishlist state

  return (
    <Router>
      <Navbar cart={cart} wishlist={wishlist} setData={setData} />
      <Routes>
        <Route path="/" element={<Product cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} items={data} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} /> {/* Wishlist Route */}
      </Routes>
    </Router>
  );
};

export default App;

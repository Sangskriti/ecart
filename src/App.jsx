import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Wishlist from "./components/WishList"; // Ensure correct import
import { items as initialItems } from "./components/Data";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([...initialItems]);
  const [items, setItems] = useState([...initialItems]); // Main state for items
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <Router>
      <Navbar cart={cart} wishlist={wishlist} setData={setData} items={items} setItems={setItems} />
      <Routes>
        <Route 
          path="/" 
          element={
            <Product 
              cart={cart} 
              setCart={setCart} 
              wishlist={wishlist} 
              setWishlist={setWishlist} 
              items={data} 
            />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <ProductDetail 
              cart={cart} 
              setCart={setCart} 
              wishlist={wishlist} 
              setWishlist={setWishlist} 
            />
          } 
        />
        <Route 
          path="/search/:term" 
          element={
            <SearchItem 
              cart={cart} 
              setCart={setCart} 
              wishlist={wishlist} 
              setWishlist={setWishlist} 
            />
          } 
        />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} setCart={setCart} />} 
        />
        <Route 
          path="/add-product" 
          element={<AddProduct setData={setData} />} 
        />
        <Route 
          path="/wishlist" 
          element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;

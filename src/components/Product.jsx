import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Product = ({ items, cart, setCart, wishlist, setWishlist }) => {

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success('Item added to cart', { autoClose: 1500 });
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.error('Removed from wishlist', { autoClose: 1500 });
    } else {
      setWishlist([...wishlist, product]);
      toast.success('Added to wishlist', { autoClose: 1500 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (
              <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
                <div className="card" style={{ width: "18rem" }}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.imgSrc} className="card-img-top" alt={product.title} />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <button className="btn btn-primary mx-3">
                      {product.price} ₹
                    </button>
                    <button onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)} className="btn btn-warning">
                      Add To Cart
                    </button>
                    <button onClick={() => toggleWishlist(product)} className="btn btn-light mx-2">
                      {isWishlisted ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product;

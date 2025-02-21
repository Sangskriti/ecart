import React from "react";
import { ToastContainer, toast } from 'react-toastify';

const Wishlist = ({ wishlist, setWishlist }) => {
  
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast.error("Removed from wishlist", { autoClose: 1500 });
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="row">
          {wishlist.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 my-3 text-center">
              <div className="card" style={{ width: "18rem" }}>
                <img src={item.imgSrc} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>Price: {item.price} ₹</p>
                  <button onClick={() => removeFromWishlist(item.id)} className="btn btn-danger">Remove ❤️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

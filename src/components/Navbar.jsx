import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { Modal, Button, Form } from "react-bootstrap";

const Navbar = ({ setData, cart, wishlist, items, setItems }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    imgSrc: "",
    category: "",
  });

  // Handle opening/closing modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search/${searchTerm}`);
    }
    setSearchTerm("");
  };

  // Handle input change for new product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || "" : value, // Ensure price is a number
    }));
  };

  // Add new product to the list
  const addProduct = () => {
    if (Object.values(newProduct).some((field) => !field)) {
      alert("Please fill all fields!");
      return;
    }

    const updatedProducts = [...items, { id: Date.now(), ...newProduct }];
    setItems(updatedProducts);
    setData(updatedProducts);
    setNewProduct({ title: "", description: "", price: "", imgSrc: "", category: "" });
    setShow(false);
  };
 

  // Filtering functions
  const filterByCategory = (category) => {
    setData(items.filter((product) => product.category.toLowerCase() === category.toLowerCase()));
  };

  const filterByPrice = (price) => {
    setData(items.filter((product) => product.price >= price));
  };

  return (
    <>
      <header className="sticky-top">
        <div className="nav-bar">
          <Link to={"/"} className="brand">
            E-Cart
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products"
            />
          </form>

          {/* Wishlist Button */}
          <Link to={"/wishlist"} className="wishlist">
            <button type="button" className="btn btn-danger position-relative">
              <AiFillHeart style={{ fontSize: "1.5rem" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlist.length}
              </span>
            </button>
          </Link>

          {/* Cart Button */}
          <Link to={"/cart"} className="cart">
            <button type="button" className="btn btn-primary position-relative">
              <BsFillCartCheckFill style={{ fontSize: "1.5rem" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            </button>
          </Link>

          {/* Add Product Button */}
          <button className="btn btn-success ms-3 text-[1.5rem]" onClick={handleShow}>
            Add Product
          </button>
        </div>

        {/* Filter Options */}
        {location.pathname === "/" && (
          <div className="nav-bar-wrapper">
            <div className="items">Filter by {"->"}</div>
            <div onClick={() => setData(items)} className="items">No Filter</div>
            <div onClick={() => filterByCategory("mobiles")} className="items">Mobiles</div>
            <div onClick={() => filterByCategory("laptops")} className="items">Laptops</div>
            <div onClick={() => filterByCategory("tablets")} className="items">Tablets</div>
            <div onClick={() => filterByPrice(29999)} className="items">{">="} 29999</div>
            <div onClick={() => filterByPrice(49999)} className="items">{">="} 49999</div>
            <div onClick={() => filterByPrice(69999)} className="items">{">="} 69999</div>
            <div onClick={() => filterByPrice(89999)} className="items">{">="} 89999</div>
          </div>
        )}
      </header>

      {/* Modal for Adding Product */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newProduct.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" name="imgSrc" value={newProduct.imgSrc} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={newProduct.category} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;

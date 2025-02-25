import axios from "axios";
const API_URL = "http://127.0.0.1:5000";

// Fetch all products
export const fetchProducts = async () => {
    try {
        const res = await axios.get(`${API_URL}/products`);
        return res.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Add a new product
export const addProduct = async (product) => {
    try {
        const res = await axios.post(`${API_URL}/products`, product);
        console.log("Product added:", res.data); 
        return res.data;
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        console.log(`Deleting product: ${id}`);  // Debugging
        await axios.delete(`${API_URL}/products/${id}`);
        console.log("Product deleted successfully!");  // Debugging
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

// Fetch cart items
export const fetchCart = async () => {
    try {
        const res = await axios.get(`${API_URL}/cart`);
        return res.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

// Add product to cart
export const addToCart = async (product_id) => {
    try {
        await axios.post(`${API_URL}/cart`, { product_id });
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};

// Remove item from cart
export const removeFromCart = async (id) => {
    try {
        await axios.delete(`${API_URL}/cart/${id}`);
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
};
// Search products by query
export const searchProducts = async (query) => {
    try {
        console.log(`Searching for: ${query}`);  // Debugging
        const res = await axios.get(`${API_URL}/search?q=${query}`);
        console.log("Search results:", res.data);  // Debugging
        return res.data;
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchProducts } from "../api";  // Import API function
import Product from "./Product";  // Display search results using Product component

const SearchItem = ({ cart, setCart, wishlist, setWishlist }) => {
    const { term } = useParams();  // Get search term from URL
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            if (term) {
                try {
                    console.log(`Fetching search results for: ${term}`);  // Debugging
                    const data = await searchProducts(term);
                    console.log("Results received:", data);  // Debugging
                    setResults(data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setResults([]);  // Handle errors by setting an empty array
                }
            }
            setLoading(false);
        };
        fetchResults();
    }, [term]);

    return (
        <div className="container my-5">
            <h2>Search Results for: {term}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : results.length > 0 ? (
                <Product 
                    items={results} 
                    cart={cart} 
                    setCart={setCart} 
                    wishlist={wishlist} 
                    setWishlist={setWishlist} 
                />
            ) : (
                <p style={{ color: "red", fontWeight: "bold" }}>No products found. Try another search.</p>
            )}
        </div>
    );
};

export default SearchItem;

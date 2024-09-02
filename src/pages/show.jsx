import { useEffect, useState } from "react";
import Verticaldots from "../verticaldots";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./show.css";
import Layout from "./Layout";

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export default function Show() {
    const [productData, setProductData] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Check for the presence of the refresh token in session storage
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/product/${id}`);
                setProductData(response.data.product);
            } catch (err) {
                console.log(err);
            }
        };
        
        const checkAuth = () => {
            const refreshToken = sessionStorage.getItem('refreshToken');
            setIsAuthenticated(!!refreshToken); // Set true if token exists, otherwise false
        };

        fetchProductData();
        checkAuth(); // Check authentication when component mounts
    }, [id]);

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${API_URL}/api/product/${id}`, { withCredentials: true });
            console.log(res);
            navigate("/"); // Redirect to homepage or another page after deletion
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToCart = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/product/cart/${id}`, {}, { withCredentials: true });
            console.log(res.data);
            navigate("/product/cart"); // Redirect to the cart page after adding to cart
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Layout />
            {productData && (
                <div className="show-page">
                    <div className="show-page-container">
                        <div className="show-page-image-container">
                            <img src={productData.productImage} alt={productData.title} className="show-image" />
                        </div>
                        <span className="show-button-span">
                            <button className="btn cart-button" onClick={handleAddToCart}>
                                <h5>Add to Cart</h5>
                            </button>
                            <button className="btn cart-button"><h5>Buy</h5></button>
                        </span>
                    </div>

                    <div className="show-second">
                        <div className="show-title"><h4>{productData.title}</h4></div>
                        <div className="show-price"><h5>&#x20B9; {productData.price}</h5></div>
                        <div className="show-description">{productData.description}</div>

                        {/* Show Delete button only if authenticated */}
                        {isAuthenticated && (
                            <button onClick={handleDelete}>Delete</button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

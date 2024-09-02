import axios from "axios";
import { useEffect, useState } from "react";
import CartPage from "../cartpage";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/cart`, { withCredentials: true });
                if (res.data && res.data.cartproduct) {
                    setCartItems(res.data.cartproduct);
                } else {
                    console.error("Unexpected response structure:", res.data);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div style={{ textDecoration: "none" }}>
            <Layout />
            {Array.isArray(cartItems) &&
                cartItems.map((item) => (
                    <Link
                        key={item.id}  // Ensure a unique key for each item
                        to={`/product/${item.item.id}`} 
                        style={{ textDecoration: "none" }}
                    >
                        <CartPage {...item} />
                    </Link>
                ))}
        </div>
    );
}

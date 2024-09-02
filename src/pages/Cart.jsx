import axios from "axios";
import { useEffect, useState } from "react";
import CartPage from "../cartpage";
import Layout from "./Layout";
import { Link } from "react-router-dom";
const AI_URPL = import.meta.env.VITE_BACKEND_URL || '/api';


export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`${AI_URPL}/api/cart`,{withCredentials: true}); // Corrected route
                setCartItems(res.data.cartproduct); // Assuming the response has a property named 'cartItems'

            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    return (
        <div style={{textDecoration: "none"}}>
            <Layout />
            {Array.isArray(cartItems) &&
                cartItems.map((item) => (
                    <Link to={`/product/${item.item.id}`} 
                    style={{ textDecoration: "none" }}
                    >  
                        <CartPage key={item.id} {...item} />
                    </Link>
                ))}

       
        </div>
    );
}
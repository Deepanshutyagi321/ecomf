
import { useEffect, useState } from "react";
import Verticaldots from "../verticaldots"

import axios from "axios";
import { Link, useNavigate , useParams } from "react-router-dom"
import "./show.css"
import Layout from "./Layout";


export default function show() {
    let [productData, setProductData] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fatchdata = async () => {
            await axios(`/api/product/${id}`)
                .then((response) => {
                    setProductData(response.data.product)
                }).catch((err) => {
                    console.log(err);
                })
        };
        fatchdata();
    }, []);

    const Delete = async () => {
        let res = await axios.delete(`/api/product/${id}`);
        console.log(res);
    }
    const AddToCart = async () => {
        
        try{
            let res = await axios.post(`/api/product/cart/${id}`);
            console.log(res.data);
            
                
                navigate("/product/cart"); // Perform the redirect
            
        }catch(err){
            console.log(err);
        }
      
    }
    return (
        <>
            <Layout />
            {productData && (
                <div className="show-page">
                    {console.log(productData)}

                    <div className="show-page-container">
                    <div className="show-page-image-container">
                    {/* imagae and other detail of product */}
                        <img src={productData.productImage} alt={productData.title} className="show-image" />   
                    </div>
                    <span className="show-button-span">
                            <button className="btn cart-button" onClick={AddToCart}>
                                <h5>Add Cart</h5>
                            </button>
                            <button className="btn cart-button"><h5>Buy</h5></button>
                        </span>
                    </div>
                    
                    {/* detail about product */}
                    <div className="show-second">
                        <div className="show-title"><h4>{productData.title}</h4></div>

                        <div className="show-price"><h5>&#x20B9; {productData.price}</h5></div>
                        <div className="show-description">{productData.description}</div>
                        <button onClick={Delete}>Delete</button>
                    </div>
                    

                </div>
            )}
        </>
    );

}
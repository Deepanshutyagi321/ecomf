import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_BACKEND_URL || '/api'
export default function ProductForm({ productId }) {
 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: "",
        category: "",
    });
    // excess the token 
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(refreshToken);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/product/${productId}`);
                const productData = response.data.product;
                setFormData({
                    title: productData.title,
                    description: productData.description,
                    price: productData.price,
                    image: productData.productImage,
                    category: productData.category[0].name,

                });
                // {console.log(formData)};
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        if (productId) {
            fetchData();
        }
    }, [productId]);

    function formHandler(event) {
        setFormData((curr) => {
            return { ...curr, [event.target.name]: event.target.value };
        });
    }

    async function submit(event) {
        event.preventDefault();

        try {
            if (productId) {
                // Update existing product with PUT request
                // await axios.put(`/api/product/${productId}`, formData);
                await axios({
                    method: 'put',
                    url: `${API_URL}/api/product/${productId}/edit`,
                    data: { formData }
                });
                console.log(productId);
            } else {
                // Create new product with POST request
                // await axios.post("/api/product", formData);
                console.log(formData);
                await axios({
                    method: 'post',
                    url: `${API_URL}/api/product`,
                    data: { formData }
                } );
               
            }

            // Additional logic after successful form submission can be added here
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle errors if needed
        }
    }

    return (
        <div className="row">
            <div className="col-8 offset-2">
                <h3>Add Product</h3>
                <form onSubmit={submit} noValidate>
                    <label htmlFor="title" className="form-label">Title</label>

                    <input
                        className="form-control"
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={formHandler}
                        required
                    />

                    <label htmlFor="image" className="form-label"> Image</label>

                    <input
                        className="form-control"
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={formHandler}
                    />

                    <label htmlFor="description" className="form-label">Description</label>

                    <textarea
                        className="form-control"
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={formHandler}
                        required
                    />

                    <label htmlFor="price" className="form-label">Price</label>

                    <input
                        className="form-control"
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={formHandler}
                        required
                    />

                    <label htmlFor="category" className="form-label">Category</label>

                    <input
                        className="form-control"
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={formHandler}
                        required
                    />

                    <button className="btn btn-success mt-3" >Save</button>
                </form>
            </div>
        </div>

    );

}

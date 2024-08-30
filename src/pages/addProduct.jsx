import { ClassNames } from "@emotion/react";
import ProductForm from "../productForm";
import "./addProduct.css"
import Layout from "./Layout";


export default function formProduct() {
    return (
        <div><Layout/>
        <div className="Product-form">
            <ProductForm/>
            
        </div>
        </div>
    )
}
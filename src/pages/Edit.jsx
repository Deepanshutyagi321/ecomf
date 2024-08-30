import { useEffect, useState } from "react";
import ProductForm from "../productForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./Layout";

export default function edit(){
    let {id} = useParams()
    let [productData , setProductData] = useState();
    
    useEffect(()=>{
        let fatchData = async()=>{
            let res = await axios.get(`/api/product/${id}`);
            setProductData(res.data.product);
        };
        fatchData();
    },[])
    return(
        <div>
            <Layout/>
        <div>
           
            
            
                <ProductForm productId={id}/>
           
            
        </div>
        </div>
    )
}
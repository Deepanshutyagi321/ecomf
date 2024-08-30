import axios from "axios"
import Cards from "../cards"
import Carousel from "../carousel";
import { useEffect, useState } from "react";
import "./home.css"


// import { Link } from "@mui/material";
import { Link } from "react-router-dom";
export default function Home() {
  const [productData, setProductData] = useState("");
  useEffect(() => {
    const fatchdata = async () => {
      await axios.get("/api/product").then((response) => {
        setProductData(response.data.product);
      }).catch((err) => {
        console.log(err);
      });
    }

    fatchdata();

  }, []);




  return (

    <div className="home-page">
      <div className="home-page-carousel">
        <Carousel />
      </div>
      {Array.isArray(productData) &&
        productData.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id}>
            <Cards className="home-page-product" Data={product} />
          </Link>
        ))}

    </div>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./pages/Layout";
import FormProduct from "./pages/addProduct"
import Show from "./pages/show"
import Edit from "./pages/Edit";
import Cart from "./pages/Cart";
import Register from "./pages/register";
import Login from "./pages/login";
import Footer from "./footer.jsx";

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

        </Route>
        <Route path="product/add" element={<FormProduct/>}/>
        <Route path="product/:id" element={<Show/>}/>
        <Route path="/product/:id/edit" element={<Edit/>}/>
        <Route path="/product/cart" element={<Cart/>}/>
        <Route path="/user/register" element={<Register/>}/>
        <Route path="/user/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
   
    </>
  )
}

export default App

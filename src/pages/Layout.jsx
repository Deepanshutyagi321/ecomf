import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import "./Layout.css";
import Slidbar from '../components/slidbar.jsx';

const Layout = () => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [formdata, setFormData] = useState({ search: '' });
  const [user, setUser] = useState('');

  useEffect(() => {
    // Retrieve tokens from sessionStorage when component mounts
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedRefreshToken = sessionStorage.getItem('refreshToken');
    console.log(storedAccessToken);
    console.log(storedRefreshToken);

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }

    const userProfile = async () => {
      try {
        const response = await axios.get("/api/user");
        setUser(response.data.data.user);
        // console.log(response.data.data.user); // Handle the user profile data
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    userProfile();
  }, []);


  const search = async (event) => {
    event.preventDefault(); // Prevent form submission
    console.log(formdata)
    let response = await axios.post("/api/product/search", formdata)
    console.log("done");
  };
  function formHandler(event) {
    setFormData((curr) => {
      return { ...curr, [event.target.name]: event.target.value };
    });
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <ul className="list">
            <li><form className="d-flex search2 " role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                name="search"
                id="search"
                value={formdata.search}
                onChange={formHandler}
              />
              <button className="btn btn-outline-success search-button" type="submit" onClick={search}>Search</button>
            </form></li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product/add">Add Product</Link>
            </li>
            <li>
              <form className="d-flex search" role="search">
                <input className="form-control me-2" value={formdata.search} type="search" placeholder="Search" aria-label="Search" name='search' id='search' onChange={formHandler} />
                <button className="btn btn-outline-success search-button" type="submit" onClick={search} onDragEnter={search}>Search</button>
              </form>
            </li>
            <li>
              <Link to="/product/cart">Cart</Link>
            </li>
            <li>
              <Link to="/user/register">Register</Link>
            </li>

            {!refreshToken && (
              <li>
                <Link to="/user/login">Login</Link>
              </li>
            )}
            <li className="slidbar-container">
              <Slidbar data={user} />
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import Font Awesome styles
import "../components/slidbar.css"; // Ensure the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';
export default function Slidbar(user) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  // Retrieve tokens from sessionStorage when component mounts
  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken');
    const storedRefreshToken = sessionStorage.getItem('refreshToken');

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }

  }, [user])


  console.log(user.data.username)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  //handle logout
  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout
     let response =  await axios.post(`${API_URL}/api/logout`,{},{withCredentials: true });
     console.log(response)
      // Clear token from sessionStorage
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      // Redirect the user to the login page
      navigate("/user/login");
    } catch (error) {
      // Handle errors, if any
      console.error("Error logging out:", error);
    }
  };


  return (
    <div className="container">
      <div className="avatar">
        <button className="toggle-button" onClick={toggleSidebar}>
          {user.data.avatar ? (
            <img src={user.data.avatar} alt={user.data.username} />
          ) : (
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Default Avatar" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="slidbar">
          <ul>
            <li>{user.data.username}</li>
            <li>About</li>

            <li>Social</li>
            {refreshToken && ( // Check for missing refresh token
              <li>
                <button onClick={handleLogout} aria-label="Logout button">
                  Logout
                </button>
              </li>
            )}
          </ul>

        </div>
      )}
    </div>
  );
}


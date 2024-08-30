import React from 'react';
import './verticaldots.css';

export default function ThreeDots() {
  const changeLanguage = (language) => {
    const element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
  };

  const showDropdown = () => {
    const dropdown = document.getElementById("myDropdown");
    dropdown.classList.toggle("show");
  };

  const closeDropdown = (event) => {
    if (!event.target.matches(".dropbtn")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  // Attach the window click event handler when the component mounts
  React.useEffect(() => {
    window.addEventListener("click", closeDropdown);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="header">
      {/* <!-- three dot menu --> */}
      <div className="dropdown">
        {/* <!-- three dots --> */}
        <ul className="dropbtn icons btn-right showLeft" onClick={showDropdown}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {/* <!-- menu --> */}
        <div id="myDropdown" className="dropdown-content">
          <a href="#home" onClick={() => changeLanguage('Open')}>
            Open
          </a>
          <a href="#about" onClick={() => changeLanguage('Edit')}>
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

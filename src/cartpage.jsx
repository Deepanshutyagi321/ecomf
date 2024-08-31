import axios from "axios";
import "./cartPage.css"
import "dotenv/config"
const API_URL = process.env.REACT_APP_BACKEND_URL || '/api';
export default function CartPage(pageData) {

 

  let deleteIteam = async (event) => {
    event.preventDefault();
    let res = await axios.delete(`${API_URL}/cart/${pageData.item.id}`);
    console.log(res);
    if (res.status === 200) {
      window.location.reload(); // Reload the page
    }
  }

  if (!pageData.item.id) {
    console.error("Item ID is missing");
    return null; // or some default content
  }
  return (

    <div className="cart" >
      <div className="cart-img">
        <img src={pageData.item.itemImage} className="card-img-top" alt={pageData.item.name} />
      </div>

      <div className="cart-cantainer-1">
        <div className="cart-title">
          <h6>{pageData.item.name}</h6>
        </div>

        <div className="cart-button1 f">
          <button onClick={deleteIteam}>Remove</button>
        </div>
      </div>


      {!pageData.item && <h4>Item not added yet</h4>}

    </div>

  );
}

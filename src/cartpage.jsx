import axios from "axios";
import "./cartPage.css";

const API_URL = import.meta.env.VITE_BACKEND_URL || '/api';

export default function CartPage(pageData) {
  const deleteItem = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.delete(`${API_URL}/api/cart/${pageData.item.id}`);
      console.log(res);
      if (res.status === 200) {
        window.location.reload(); // Reload the page
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting the item:", error.message);
    }
  };

  if (!pageData.item || !pageData.item.id) {
    console.error("Item ID is missing or invalid");
    return null;
  }

  return (
    <div className="cart">
      <div className="cart-img">
        <img src={pageData.item.itemImage} className="card-img-top" alt={pageData.item.name} />
      </div>

      <div className="cart-container-1">
        <div className="cart-title">
          <h6>{pageData.item.name}</h6>
        </div>

        <div className="cart-button1 f">
          <button onClick={deleteItem}>Remove</button>
        </div>
      </div>

      {!pageData.item && <h4>Item not added yet</h4>}
    </div>
  );
}

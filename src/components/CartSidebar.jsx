import { Link } from "react-router-dom";
import "./CartSidebar.css";

/*
  This is the sliding panel that pops out from the Navbar's cart button.
  All the data (cartItems, isOpen) and functions (onClose, onIncrease,
  onDecrease, onRemove) come from App.jsx as props. This component
  doesn't store any of its own state - it just displays whatever
  it's given.
*/
function CartSidebar({ cartItems, isOpen, onClose, onIncrease, onDecrease, onRemove }) {
  // Add up price * quantity for every item to get the total
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price * cartItems[i].quantity;
  }

  return (
    <>
      {/* The dark overlay behind the sidebar. Clicking it closes the cart. */}
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={isOpen ? "cart-sidebar cart-sidebar-open" : "cart-sidebar"}>
        <div className="cart-sidebar-header">
          <h3>Your Cart</h3>
          <button className="cart-close-button" onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty-text">
            Nothing here yet. Add a product and it will show up here.
          </p>
        ) : (
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>

                  {/* Quantity stepper: minus button, current number, plus button */}
                  <div className="cart-qty-stepper">
                    <button
                      className="cart-qty-button"
                      onClick={() => onDecrease(item.id)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      −
                    </button>
                    <span className="cart-qty-number">{item.quantity}</span>
                    <button
                      className="cart-qty-button"
                      onClick={() => onIncrease(item.id)}
                      aria-label={`Add one more ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="cart-remove-button"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-sidebar-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Link to the full cart page, where the user can review everything */}
          <Link to="/cart" className="btn btn-outline cart-view-button" onClick={onClose}>
            View full cart
          </Link>

          {/* Link to checkout. If the cart is empty, this is just a disabled
              button instead of a link - we check cartItems.length to decide. */}
          {cartItems.length === 0 ? (
            <button className="btn btn-orange cart-checkout-button" disabled>
              Checkout
            </button>
          ) : (
            <Link to="/checkout" className="btn btn-orange cart-checkout-button" onClick={onClose}>
              Checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;

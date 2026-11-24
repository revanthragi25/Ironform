import { Link } from "react-router-dom";
import "./Cart.css";

/*
  This is the full Cart PAGE (different from the CartSidebar, which is
  the small slide-out panel). This page shows the same cart data in a
  bigger, easier-to-review layout - useful for the user to double check
  everything before going to checkout.

  All of the data and functions come from App.jsx as props:
  - cartItems: the array of items currently in the cart
  - onIncrease / onDecrease: change an item's quantity by 1
  - onRemove: remove an item from the cart completely
*/
function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
  // Add up price * quantity for every item to get the total
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price * cartItems[i].quantity;
  }

  return (
    <main>
      <section className="section cart-page-hero">
        <div className="container">
          <p className="eyebrow">Your Cart</p>
          <h1 className="section-title">Review your order</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="cart-page-empty">
              <p>Your cart is empty right now.</p>
              <Link to="/shop" className="btn btn-orange">Browse the shop</Link>
            </div>
          ) : (
            <div className="cart-page-grid">
              {/* Left side: the list of items */}
              <div className="cart-page-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-page-row">
                    <img src={item.image} alt={item.name} />

                    <div className="cart-page-row-info">
                      <h3>{item.name}</h3>
                      <p className="cart-page-row-price">${item.price.toFixed(2)} each</p>
                    </div>

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

                    <p className="cart-page-row-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                      className="cart-remove-button"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* Right side: order summary and checkout button */}
              <div className="cart-page-summary">
                <h3>Order Summary</h3>

                <div className="cart-page-summary-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-page-summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="cart-page-summary-row cart-page-summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="btn btn-orange cart-page-checkout-btn">
                  Go to checkout
                </Link>
                <Link to="/shop" className="cart-page-continue-link">
                  ← Continue shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Cart;

import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Checkout.css";

/*
  CHECKOUT PAGE
  -------------
  Everything for this page lives in this ONE file - the form fields,
  the math (subtotal/delivery fee/tax/total), the payment method
  picker, and the "place order" logic. That's on purpose: it's easier
  to follow one file top to bottom than to jump between several.

  This page has two "modes", controlled by the "orderPlaced" state:

  1. orderPlaced = false -> show the Delivery Details form, the
     Order Summary box, and the Payment Method choices.
  2. orderPlaced = true  -> show an "Order Received" confirmation
     screen instead.

  Props coming in from App.jsx:
  - cartItems: the array of items currently in the cart
  - onOrderPlaced: a function that empties the cart in App.jsx
    once the order is confirmed
*/
function Checkout({ cartItems, onOrderPlaced }) {
  // ----- Delivery details form fields -----
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // ----- Which payment method is selected: "upi" or "cod" -----
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // ----- Order state -----
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // We "snapshot" these numbers into state the moment the order is
  // placed. This matters because onOrderPlaced() empties the cart
  // right after - if we kept reading the total from cartItems after
  // that, the confirmation screen would show $0.00.
  const [orderTotal, setOrderTotal] = useState(0);

  // ---------- The math ----------
  // Add up price * quantity for every item to get the subtotal
  let subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    subtotal = subtotal + cartItems[i].price * cartItems[i].quantity;
  }

  // A flat delivery fee - free once the order is big enough
  let deliveryFee = 4.99;
  if (subtotal >= 75) {
    deliveryFee = 0;
  }

  // Simple 5% tax on the subtotal
  const taxRate = 0.05;
  const tax = subtotal * taxRate;

  const total = subtotal + deliveryFee + tax;

  // ---------- Handling the form submit ----------
  function handlePlaceOrder(event) {
    // Stop the browser's normal "reload the page" behavior
    event.preventDefault();

    // Make up a simple order number using the current time.
    // (In a real app, this number would come back from a real server.)
    const newOrderNumber = "IF-" + Date.now().toString().slice(-6);
    setOrderNumber(newOrderNumber);

    // Save today's total before the cart gets emptied below
    setOrderTotal(total);

    setOrderPlaced(true);
    onOrderPlaced(); // tells App.jsx to empty the cart
  }

  // If there's nothing in the cart AND no order has just been placed,
  // there's nothing to check out - send the user back to the cart page.
  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  // ================= ORDER RECEIVED SCREEN =================
  if (orderPlaced) {
    return (
      <main>
        <section className="section order-received">
          <div className="container order-received-inner">
            <span className="order-received-icon">✓</span>
            <h1 className="section-title">Order received!</h1>
            <p className="section-text" style={{ margin: "0 auto 20px" }}>
              Thanks, {firstName || "there"}. Your order
              <strong> {orderNumber} </strong>
              has been placed and a confirmation has been sent to
              <strong> {email}</strong>.
            </p>
            <p className="order-received-total">
              Total charged: <strong>${orderTotal.toFixed(2)}</strong>
            </p>
            <p className="order-received-method">
              Payment method:{" "}
              <strong>{paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}</strong>
            </p>

            <div className="order-received-buttons">
              <Link to="/shop" className="btn btn-outline">Continue shopping</Link>
              <Link to="/" className="btn btn-orange">Back to home</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ================= CHECKOUT FORM SCREEN =================
  return (
    <main>
      <section className="section checkout-hero">
        <div className="container">
          <p className="eyebrow">Checkout</p>
          <h1 className="section-title">Almost there</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* The whole checkout is one form, so pressing "Place Order"
              triggers handlePlaceOrder for the entire page at once. */}
          <form className="checkout-grid" onSubmit={handlePlaceOrder}>
            {/* ---------- Left column ---------- */}
            <div className="checkout-left">
              {/* ----- Delivery Details card ----- */}
              <div className="checkout-card">
                <h3 className="checkout-card-heading">
                  <span className="checkout-card-icon">📍</span>
                  Delivery Details
                </h3>

                <div className="checkout-form-row">
                  <label>
                    <span>First Name</span>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Rahul"
                    />
                  </label>
                  <label>
                    <span>Last Name</span>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Mehta"
                    />
                  </label>
                </div>

                <label>
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                  />
                </label>

                <label>
                  <span>Delivery Address</span>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(event) => setDeliveryAddress(event.target.value)}
                    placeholder="House No, Street, Area"
                  />
                </label>

                <div className="checkout-form-row">
                  <label>
                    <span>City</span>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Hyderabad"
                    />
                  </label>
                  <label>
                    <span>Pincode</span>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(event) => setPincode(event.target.value)}
                      placeholder="500034"
                    />
                  </label>
                </div>
              </div>

              {/* ----- Payment Method card ----- */}
              <div className="checkout-card">
                <h3 className="checkout-card-heading">
                  <span className="checkout-card-icon">💳</span>
                  Payment Method
                </h3>

                <div className="payment-method-row">
                  {/* Clicking either box just changes the paymentMethod
                      state - there's no real payment happening here. */}
                  <button
                    type="button"
                    className={
                      paymentMethod === "upi"
                        ? "payment-method-box payment-method-box-active"
                        : "payment-method-box"
                    }
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <span className="payment-method-icon">▦</span>
                    <span>UPI</span>
                  </button>

                  <button
                    type="button"
                    className={
                      paymentMethod === "cod"
                        ? "payment-method-box payment-method-box-active"
                        : "payment-method-box"
                    }
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <span className="payment-method-icon">💵</span>
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                <p className="checkout-demo-note">
                  This is a demo checkout — no real payment is processed here.
                </p>
              </div>
            </div>

            {/* ---------- Right column: Order Summary ---------- */}
            <div className="checkout-right">
              <div className="checkout-card order-summary-card">
                <h3 className="checkout-card-heading">
                  <span className="checkout-card-icon">🧾</span>
                  Order Summary
                </h3>

                <ul className="order-summary-list">
                  {cartItems.map((item) => (
                    <li key={item.id} className="order-summary-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-summary-item-info">
                        <p className="order-summary-item-name">{item.name}</p>
                        <p className="order-summary-item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="order-summary-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="order-summary-totals">
                  <div className="order-summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="order-summary-row">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="order-summary-row">
                    <span>Tax (5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="order-summary-grand-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button type="submit" className="btn btn-orange place-order-btn">
                  🔒 Place Order
                </button>

                <p className="secure-payment-note">🛡 100% Secure Payment</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Checkout;

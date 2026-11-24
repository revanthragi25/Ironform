import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";

import Home from "./pages/Home";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Diet from "./pages/Diet";
import Plans from "./pages/Plans";
import Shop from "./pages/Shop";
import Trainers from "./pages/Trainers";
import About from "./pages/About";
import Join from "./pages/Join";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import { useState } from "react";

/*
  App.jsx is the top of the component tree. This is where we keep
  the cart state, since the Navbar, Shop page, Cart page, and
  Checkout page ALL need access to it.

  Instead of using React Context (a more advanced tool), we just
  keep the state here and pass it down as plain props. This is
  often called "lifting state up" - putting state in the closest
  shared parent of all the components that need it.
*/

function App() {
  // The list of items currently in the cart.
  // Each item looks like: { id, name, price, image, quantity }
  const [cartItems, setCartItems] = useState([]);

  // Whether the cart sidebar is currently open or closed
  const [cartIsOpen, setCartIsOpen] = useState(false);

  // Called whenever the user clicks "Add to cart" on a product
  function handleAddToCart(product) {
    // Check if this product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // It's already in the cart, so just increase its quantity by 1.
      // We build a brand new array instead of changing the old one
      // directly, because React needs a new array to notice the change.
      const updatedItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      // It's a new product, so add it to the cart with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Called when the user clicks the "+" button on a cart item
  function handleIncreaseQuantity(productId) {
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  // Called when the user clicks the "-" button on a cart item.
  // If quantity would drop to 0, we remove the item entirely instead.
  function handleDecreaseQuantity(productId) {
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem && existingItem.quantity <= 1) {
      handleRemoveFromCart(productId);
      return;
    }

    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  // Called when the user clicks "Remove" on a cart item
  function handleRemoveFromCart(productId) {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
  }

  // Called after a successful "Place order" on the Checkout page.
  // We empty the cart since the order is now complete.
  function handleClearCart() {
    setCartItems([]);
  }

  // Add up the quantity of every item to get the total cart count
  // (shown as a little number badge on the cart button)
  let totalCartCount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalCartCount = totalCartCount + cartItems[i].quantity;
  }

  return (
    <>
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => setCartIsOpen(true)}
      />

      {/*
        Routes decides WHICH page component to show based on the
        current URL in the browser. Only one <Route> will match
        and render at a time.
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/plans" element={<Plans />} />
        <Route
          path="/shop"
          element={
            <Shop
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          }
        />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
              onRemove={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout cartItems={cartItems} onOrderPlaced={handleClearCart} />
          }
        />
        {/* The "*" path matches any URL that didn't match one above */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

      <CartSidebar
        cartItems={cartItems}
        isOpen={cartIsOpen}
        onClose={() => setCartIsOpen(false)}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
        onRemove={handleRemoveFromCart}
      />
    </>
  );
}

export default App;


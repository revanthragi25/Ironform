import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// This is the list of links shown in the top menu.
// Keeping it as an array means we can use .map() below
// instead of writing out the same <Link> tag 7 times.
const navLinks = [
  { path: "/", text: "Home" },
  { path: "/programs", text: "Programs" },
  { path: "/diet", text: "Diet & Nutrition" },
  { path: "/plans", text: "30-90 Day Plans" },
  { path: "/shop", text: "Shop" },
  { path: "/trainers", text: "Trainers" },
  { path: "/about", text: "About" },
];

// The Navbar receives the cart information as props from App.jsx,
// instead of using React Context. This keeps things simple to follow:
// you can see exactly where cartCount and onCartClick come from.
function Navbar({ cartCount, onCartClick }) {
  // This piece of state remembers if the mobile menu is open or closed.
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function toggleMenu() {
    setMenuIsOpen(!menuIsOpen);
  }

  function closeMenu() {
    setMenuIsOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Logo / brand name, always links back to the home page */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo">IF</span>
          <span>IRONFORM</span>
        </Link>

        {/* Links shown on a normal desktop screen */}
        <nav className="navbar-links-desktop">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="navbar-link">
              {link.text}
            </Link>
          ))}
        </nav>

        <div className="navbar-right">
          {/* Cart button. Clicking it calls the function passed down from App.jsx */}
          <button className="cart-button" onClick={onCartClick}>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          <Link to="/join" className="btn btn-orange navbar-join-btn">
            Join Now
          </Link>

          {/* Hamburger button, only visible on mobile (hidden by CSS on bigger screens) */}
          <button className="menu-button" onClick={toggleMenu}>
            {menuIsOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu - only rendered when menuIsOpen is true */}
      {menuIsOpen && (
        <nav className="navbar-links-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar-link-mobile"
              onClick={closeMenu}
            >
              {link.text}
            </Link>
          ))}
          <Link to="/cart" className="navbar-link-mobile" onClick={closeMenu}>
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
          <Link to="/join" className="btn btn-orange" onClick={closeMenu}>
            Join Now
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;

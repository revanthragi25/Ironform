import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  // We calculate the current year once, so the copyright text
  // is always correct without us having to update it by hand.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span className="navbar-logo">IF</span>
            <span>IRONFORM</span>
          </div>
          <p className="footer-text">
            A gym built on form, food, and follow-through. No shortcuts, no
            gimmicks — just a structure that works if you work it.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-list">
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/diet">Diet & Nutrition</Link></li>
            <li><Link to="/plans">30–90 Day Plans</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Gym</h4>
          <ul className="footer-list">
            <li><Link to="/trainers">Trainers</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/join">Membership</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Visit</h4>
          <p className="footer-text">221B Forge Street, Hyderabad</p>
          <p className="footer-text">Mon–Sat: 5am – 11pm</p>
          <p className="footer-text">hello@ironform.gym</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {currentYear} IronForm Gym. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

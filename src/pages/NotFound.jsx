import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found">
      <div className="container not-found-inner">
        <p className="not-found-code">404</p>
        <h1 className="section-title">This page skipped leg day</h1>
        <p className="section-text" style={{ margin: "0 auto 24px" }}>
          The page you're looking for doesn't exist, or it moved.
        </p>
        <Link to="/" className="btn btn-orange">Back to home</Link>
      </div>
    </main>
  );
}

export default NotFound;

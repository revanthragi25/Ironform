import { useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";
import "./Shop.css";

const allCategories = ["All", ...new Set(productsData.map((p) => p.category))];

/*
  The Shop page receives these props from App.jsx:
  - cartItems: the current list of items in the cart (so we can show
    the right quantity on each product card)
  - onAddToCart, onIncrease, onDecrease: functions that update the
    cart state, which actually lives in App.jsx
*/
function Shop({ cartItems, onAddToCart, onIncrease, onDecrease }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  let productsToShow = productsData;
  if (selectedCategory !== "All") {
    productsToShow = productsData.filter((p) => p.category === selectedCategory);
  }

  // For a given product, find out how many of it are already in the cart.
  // If it's not in the cart at all, this returns 0.
  function getQuantityInCart(productId) {
    const matchingItem = cartItems.find((item) => item.id === productId);
    if (matchingItem) {
      return matchingItem.quantity;
    }
    return 0;
  }

  return (
    <main>
      <section className="section shop-hero">
        <div className="container">
          <p className="eyebrow">Shop</p>
          <h1 className="section-title">Gear and supplements the coaches actually use</h1>
          <p className="section-text">
            Add anything to your cart. Once it's added, use the +/- buttons right
            on the card to add one more or remove one.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="category-filter">
            {allCategories.map((category) => (
              <button
                key={category}
                className={
                  category === selectedCategory
                    ? "category-button category-button-active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="programs-count">{productsToShow.length} products</p>

          <div className="shop-grid">
            {productsToShow.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={getQuantityInCart(product.id)}
                onAddToCart={onAddToCart}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Shop;

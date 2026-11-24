import "./ProductCard.css";

/*
  This card shows one product.

  - "quantityInCart" tells us how many of THIS product are already
    in the cart (0 if none).
  - "onAddToCart", "onIncrease", and "onDecrease" are functions passed
    down from the Shop page (which got them from App.jsx).

  If quantityInCart is 0, we show a plain "Add to cart" button.
  If quantityInCart is 1 or more, we show a -/number/+ stepper instead,
  so the user can add one more or remove one right from this card.
*/
function ProductCard({ product, quantityInCart, onAddToCart, onIncrease, onDecrease }) {
  return (
    <div className="card product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} />
        {product.tags.length > 0 && (
          <span className="tag product-card-badge">{product.tags[0]}</span>
        )}
      </div>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-title">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>
        <p className="product-card-rating">
          ★ {product.rating} ({product.reviews} reviews)
        </p>

        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>

          {quantityInCart === 0 ? (
            <button className="btn btn-dark" onClick={() => onAddToCart(product)}>
              Add to cart
            </button>
          ) : (
            <div className="product-qty-stepper">
              <button
                className="product-qty-button"
                onClick={() => onDecrease(product.id)}
                aria-label={`Remove one ${product.name}`}
              >
                −
              </button>
              <span className="product-qty-number">{quantityInCart}</span>
              <button
                className="product-qty-button"
                onClick={() => onIncrease(product.id)}
                aria-label={`Add one more ${product.name}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

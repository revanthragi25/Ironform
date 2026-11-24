import "./FoodListSection.css";

// This component is reused for BOTH the "foods to favor" list
// and the "foods to limit" list. The "variant" prop tells it
// which style/icon to use ("favor" or "limit").
function FoodListSection({ title, items, variant }) {
  // We pick the icon and CSS class based on the variant prop
  const icon = variant === "favor" ? "✓" : "!";
  const boxClassName =
    variant === "favor" ? "food-list-box food-list-favor" : "food-list-box food-list-limit";

  return (
    <div className={boxClassName}>
      <h4 className="food-list-title">{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item.name} className="food-list-item">
            <span className="food-list-icon">{icon}</span>
            <div>
              <p className="food-list-name">{item.name}</p>
              <p className="food-list-why">{item.why}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodListSection;

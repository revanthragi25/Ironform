import "./MealCard.css";

// This shows one meal from the sample meal plan.
// No state needed here - it just displays the data it's given.
function MealCard({ meal }) {
  return (
    <div className="meal-card">
      <div className="meal-card-header">
        <h4>{meal.meal}</h4>
        <span className="tag tag-green">{meal.goal}</span>
      </div>

      <ul className="meal-card-items">
        {meal.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="meal-card-macros">
        <span>{meal.calories} kcal</span>
        <span>{meal.protein} protein</span>
      </div>
    </div>
  );
}

export default MealCard;

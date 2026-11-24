import { useState } from "react";
import "./DietPrincipleCard.css";

// A simple lookup so we can show an emoji icon based on a short
// text key stored in the JSON file (like "drumstick" or "scale").
const icons = {
  drumstick: "🍗",
  scale: "⚖️",
  wheat: "🌾",
  droplet: "🥑",
  droplets: "💧",
  clock: "🕐",
};

function DietPrincipleCard({ principle }) {
  // "expanded" remembers whether this card is open or closed.
  // Each card has its OWN expanded state, since this state lives
  // inside this component (not in a shared place).
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  return (
    <div className="diet-principle-card">
      <button className="diet-principle-header" onClick={toggleExpanded}>
        <span className="diet-principle-icon">
          {icons[principle.icon] || "🍽️"}
        </span>
        <span className="diet-principle-text">
          <span className="diet-principle-title">{principle.title}</span>
          <span className="diet-principle-summary">{principle.summary}</span>
        </span>
        <span className="diet-principle-toggle">{expanded ? "−" : "+"}</span>
      </button>

      {/* Only show the detailed paragraph when expanded is true */}
      {expanded && <p className="diet-principle-detail">{principle.detail}</p>}
    </div>
  );
}

export default DietPrincipleCard;

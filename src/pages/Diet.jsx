import { Link } from "react-router-dom";
import DietPrincipleCard from "../components/DietPrincipleCard";
import SafetyNote from "../components/SafetyNote";
import MealCard from "../components/MealCard";
import FoodListSection from "../components/FoodListSection";
import dietData from "../data/diet.json";
import "./Diet.css";

function Diet() {
  return (
    <main>
      <section className="diet-hero">
        <div className="container diet-hero-grid">
          <div>
            <p className="eyebrow eyebrow-green">Diet & Nutrition</p>
            <h1 className="section-title">Food is the other half of training</h1>
            <p className="section-text">
              A workout breaks muscle down. Food is what rebuilds it. This guide covers
              how to structure a diet, what to actually eat, and where the safety lines are.
            </p>
          </div>
          <img
            className="diet-hero-image"
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
            alt="A balanced plate of grilled chicken, rice and greens"
          />
        </div>
      </section>

      {/* How to follow a diet - the core principles */}
      <section className="section">
        <div className="container">
          <p className="eyebrow eyebrow-green">How to follow a diet</p>
          <h2 className="section-title">Six rules that cover most of it</h2>
          <p className="section-text" style={{ marginBottom: 36 }}>
            Click any rule to see the reasoning behind it.
          </p>

          <div className="diet-principles-grid">
            {dietData.principles.map((principle) => (
              <DietPrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </div>
      </section>

      {/* What to eat - sample meal plan */}
      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow eyebrow-green">What to eat</p>
          <h2 className="section-title">A sample day on a muscle-gain plan</h2>
          <p className="section-text" style={{ marginBottom: 36 }}>
            This is a template, not a strict rule. A coach can build your exact numbers.
          </p>

          <div className="meal-grid">
            {dietData.sampleMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      </section>

      {/* Foods to favor / limit */}
      <section className="section">
        <div className="container">
          <p className="eyebrow eyebrow-green">Food choices</p>
          <h2 className="section-title">What to reach for, what to limit</h2>

          <div className="food-grid">
            <FoodListSection
              title="Foods to favor"
              items={dietData.foodsToFavor}
              variant="favor"
            />
            <FoodListSection
              title="Foods to limit"
              items={dietData.foodsToLimit}
              variant="limit"
            />
          </div>
        </div>
      </section>

      {/* How to be safe */}
      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">How to be safe</p>
          <h2 className="section-title">Diets fail for predictable reasons</h2>
          <p className="section-text" style={{ marginBottom: 30 }}>
            Most diet problems aren't dramatic, they're slow, from cutting too hard for too long.
          </p>

          <div className="safety-grid">
            {dietData.safety.map((note) => (
              <SafetyNote key={note.id} note={note} />
            ))}
          </div>

          <p className="diet-disclaimer">
            This guide is general education, not personalized medical advice. If you have an
            existing health condition or are pregnant, talk to a doctor before making a
            big change to how you eat.
          </p>
        </div>
      </section>

      <section className="section diet-cta">
        <div className="container">
          <h2 className="section-title">Want a plan built around your numbers?</h2>
          <p className="section-text" style={{ color: "#e9ecdf", margin: "0 auto 26px" }}>
            A free nutrition consult is included with every membership.
          </p>
          <Link to="/join" className="btn btn-green">Book a nutrition consult</Link>
        </div>
      </section>
    </main>
  );
}

export default Diet;

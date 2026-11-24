import { useState } from "react";
import "./Join.css";

// A plain array of plan options. We define it outside the
// component since it never changes.
const membershipPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 39,
    features: ["Gym floor access", "2 coached classes / week", "Beginner Bootcamp included"],
  },
  {
    id: "transform",
    name: "Transform",
    price: 69,
    features: ["Unlimited coached classes", "Free nutrition consult", "30–90 day plan with a coach"],
  },
  {
    id: "elite",
    name: "Elite",
    price: 109,
    features: ["Everything in Transform", "1-on-1 coaching, 2x/month", "Monthly progress review"],
  },
];

function Join() {
  // Which plan card is currently selected
  const [selectedPlanId, setSelectedPlanId] = useState("transform");

  // The form fields. We keep them together in one object since
  // they're always submitted together.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("Build strength");

  // Whether the form has been submitted yet
  const [submitted, setSubmitted] = useState(false);

  function handleFormSubmit(event) {
    // Stop the browser from doing its normal "reload the page" behavior
    event.preventDefault();
    setSubmitted(true);
  }

  // Find the full plan object that matches the selected id,
  // so we can show its name in a couple of places below.
  let selectedPlan = membershipPlans[0];
  for (let i = 0; i < membershipPlans.length; i++) {
    if (membershipPlans[i].id === selectedPlanId) {
      selectedPlan = membershipPlans[i];
    }
  }

  // After the form is submitted, show a confirmation screen
  // instead of the form.
  if (submitted) {
    return (
      <main>
        <section className="section join-success">
          <div className="container join-success-inner">
            <span className="join-success-icon">✓</span>
            <h1 className="section-title">You're in!</h1>
            <p className="section-text" style={{ margin: "0 auto 20px" }}>
              We've reserved your spot on the <strong>{selectedPlan.name}</strong> plan. A
              coach will email <strong>{email}</strong> within one business day.
            </p>
            <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
              Edit details
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section join-hero">
        <div className="container">
          <p className="eyebrow">Membership</p>
          <h1 className="section-title">Pick a plan, then tell us your goal</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="plan-cards-grid">
            {membershipPlans.map((plan) => (
              <button
                key={plan.id}
                className={
                  plan.id === selectedPlanId
                    ? "plan-card plan-card-active"
                    : "plan-card"
                }
                onClick={() => setSelectedPlanId(plan.id)}
              >
                <h3>{plan.name}</h3>
                <p className="plan-card-price">${plan.price}/month</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container join-form-section">
          <h2 className="section-title">Reserve your spot</h2>

          <form className="join-form" onSubmit={handleFormSubmit}>
            <label>
              <span>Full name</span>
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Jordan Smith"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jordan@email.com"
              />
            </label>

            <label>
              <span>Primary goal</span>
              <select value={goal} onChange={(event) => setGoal(event.target.value)}>
                <option>Build strength</option>
                <option>Lose fat</option>
                <option>Build muscle</option>
                <option>General fitness</option>
              </select>
            </label>

            <button type="submit" className="btn btn-orange join-form-submit">
              Confirm {selectedPlan.name} membership
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Join;

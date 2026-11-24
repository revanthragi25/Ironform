import { Link } from "react-router-dom";
import TransformationTimeline from "../components/TransformationTimeline";
import plansData from "../data/transformationPlans.json";
import "./Plans.css";

function Plans() {
  return (
    <main>
      <section className="section plans-hero">
        <div className="container">
          <p className="eyebrow">Transformation Plans</p>
          <h1 className="section-title">30, 60, 90 days, pick your runway</h1>
          <p className="section-text">
            Click a phase below to see the week-by-week breakdown for training and diet.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <TransformationTimeline plans={plansData} />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">Before you start</p>
          <h2 className="section-title">Three things that decide whether a plan works</h2>

          <div className="plans-tips-grid">
            <div className="plans-tips-box">
              <h3>Consistency beats intensity</h3>
              <p>Four mediocre sessions a week beats one perfect session and three skipped ones.</p>
            </div>
            <div className="plans-tips-box">
              <h3>Track something</h3>
              <p>Weight, reps, or photos, pick at least one measure and check it every two weeks.</p>
            </div>
            <div className="plans-tips-box">
              <h3>Recovery is part of the plan</h3>
              <p>Deload weeks aren't optional rest, they're where adaptation locks in.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section plans-cta">
        <div className="container">
          <h2 className="section-title">Start day one this week</h2>
          <p className="section-text" style={{ color: "#c7c9cc", margin: "0 auto 26px" }}>
            A coach will help you pick the right starting phase for your experience.
          </p>
          <Link to="/join" className="btn btn-orange">Get matched with a coach</Link>
        </div>
      </section>
    </main>
  );
}

export default Plans;

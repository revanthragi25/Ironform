import { Link } from "react-router-dom";
import "./Hero.css";

// The Hero is the big banner section at the top of the home page.
// It doesn't need any state - it just displays some text, two
// buttons, and an image, so it's a very simple component.
function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Strength · Nutrition · Recovery</p>
          <h1 className="hero-title">
            Train with a plan.
            <br />
            Eat with a purpose.
            <br />
            <span className="hero-title-orange">Show up anyway.</span>
          </h1>
          <p className="hero-text">
            IronForm pairs every workout with a real nutrition plan and a 30,
            60, or 90-day roadmap, so you always know exactly what today's
            session and today's plate are supposed to do for you.
          </p>

          <div className="hero-buttons">
            <Link to="/plans" className="btn btn-orange">
              View the 30–90 day plans
            </Link>
            <Link to="/programs" className="btn btn-outline">
              Browse programs
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <p className="hero-stat-number">4,200+</p>
              <p className="hero-stat-label">Members trained</p>
            </div>
            <div>
              <p className="hero-stat-number">6</p>
              <p className="hero-stat-label">Coaching programs</p>
            </div>
            <div>
              <p className="hero-stat-number">90</p>
              <p className="hero-stat-label">Day plan</p>
            </div>
          </div>
        </div>

        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80"
          alt="Athlete lifting a barbell in the gym"
        />
      </div>
    </section>
  );
}

export default Hero;

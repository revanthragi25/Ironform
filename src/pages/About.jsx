import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <main>
      <section className="section about-hero">
        <div className="container about-hero-grid">
          <div>
            <p className="eyebrow">About IronForm</p>
            <h1 className="section-title">
              Built by people tired of gyms that sell memberships and nothing else
            </h1>
            <p className="section-text">
              IronForm opened in 2016 with one rule: every member gets a plan, not just a
              key fob. Coached programs, a real nutrition guide, and a 90-day roadmap
              from day one.
            </p>
          </div>
          <img
            className="about-hero-image"
            src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&q=80"
            alt="Inside the gym floor with free weights and racks"
          />
        </div>
      </section>

      <section className="section">
        <div className="container about-values-grid">
          <div className="about-value-box">
            <span className="about-value-number">01</span>
            <h3>Form before load</h3>
            <p>Every new member's first two weeks are about technique, no matter how strong they are walking in.</p>
          </div>
          <div className="about-value-box">
            <span className="about-value-number">02</span>
            <h3>Food is not an afterthought</h3>
            <p>A nutrition consult is part of onboarding, not an upsell.</p>
          </div>
          <div className="about-value-box">
            <span className="about-value-number">03</span>
            <h3>Plans, not vibes</h3>
            <p>Every program has a defined timeline and a defined milestone.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <p className="eyebrow">Inside the gym</p>
          <h2 className="section-title">A floor built for barbells first</h2>

          <div className="about-gallery-grid">
            <img src="https://images.unsplash.com/photo-1623874514711-0f321325f318?w=700&q=80" alt="Squat rack area" />
            <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=700&q=80" alt="Free weights rack" />
            <img src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=700&q=80" alt="Studio space" />
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container">
          <h2 className="section-title">Come see the floor for yourself</h2>
          <Link to="/join" className="btn btn-orange">Book a tour</Link>
        </div>
      </section>
    </main>
  );
}

export default About;

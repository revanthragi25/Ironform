import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProgramCard from "../components/ProgramCard";
import TestimonialCard from "../components/TestimonialCard";
import programsData from "../data/programs.json";
import testimonialsData from "../data/testimonials.json";
import "./Home.css";

function Home() {
  // We only want to show 3 programs on the home page (not all 6),
  // so we use .slice(0, 3) to grab just the first three.
  const featuredPrograms = programsData.slice(0, 3);

  return (
    <main>
      <Hero />

      {/* Why IronForm section */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Why IronForm</p>
          <h2 className="section-title">Three things, done properly</h2>

          <div className="why-grid">
            <div className="why-box">
              <span className="why-number">01</span>
              <h3>Coached programs</h3>
              <p>Every session is led by a certified coach, not a generic class on a screen.</p>
            </div>
            <div className="why-box">
              <span className="why-number">02</span>
              <h3>Food built in</h3>
              <p>Training plans ship with a matching nutrition plan, not just what to lift.</p>
            </div>
            <div className="why-box">
              <span className="why-number">03</span>
              <h3>A real timeline</h3>
              <p>30, 60, and 90-day milestones so you always know if this week should feel hard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured programs section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header-row">
            <div>
              <p className="eyebrow">Programs</p>
              <h2 className="section-title">Pick a path, not a guess</h2>
              <p className="section-text">
                Six coached programs covering strength, size, conditioning, and recovery.
              </p>
            </div>
            <Link to="/programs" className="btn btn-outline">View all programs</Link>
          </div>

          <div className="grid-3">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Diet preview band */}
      <section className="section diet-band">
        <div className="container diet-band-grid">
          <img
            className="diet-band-image"
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
            alt="A balanced meal of grilled chicken, rice, and vegetables"
          />
          <div>
            <p className="eyebrow eyebrow-green">Diet & Nutrition</p>
            <h2 className="section-title">The plate matters as much as the bar</h2>
            <p className="section-text" style={{ marginBottom: 28 }}>
              Every program comes with a nutrition guide: protein targets, sample meals,
              foods to favor, foods to limit, and safety notes.
            </p>
            <Link to="/diet" className="btn btn-green">Explore the nutrition guide</Link>
          </div>
        </div>
      </section>

      {/* 30/60/90 plans preview */}
      <section className="section section-alt plans-preview">
        <div className="container">
          <p className="eyebrow">Transformation Plans</p>
          <h2 className="section-title">30, 60, or 90 days</h2>
          <p className="section-text" style={{ margin: "0 auto 32px" }}>
            Every plan is broken into weekly milestones across training and diet.
          </p>

          <div className="plans-preview-grid">
            <Link to="/plans" className="plans-preview-card">
              <span className="plans-preview-number">30</span>
              <span>Foundation Phase</span>
            </Link>
            <Link to="/plans" className="plans-preview-card">
              <span className="plans-preview-number">60</span>
              <span>Build Phase</span>
            </Link>
            <Link to="/plans" className="plans-preview-card">
              <span className="plans-preview-number">90</span>
              <span>Transformation Phase</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <p className="eyebrow">Real results</p>
          <h2 className="section-title">From people who showed up on the bad days too</h2>

          <div className="grid-4">
            {testimonialsData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="section final-cta">
        <div className="container final-cta-inner">
          <h2 className="section-title">Your first session is on us</h2>
          <p className="section-text" style={{ color: "#c7c9cc", margin: "0 auto 28px" }}>
            Walk in, meet a coach, and leave with a plan, no commitment required.
          </p>
          <Link to="/join" className="btn btn-orange">Book a free session</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;

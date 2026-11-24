import { useParams, Link, Navigate } from "react-router-dom";
import programsData from "../data/programs.json";
import trainersData from "../data/trainers.json";
import "./ProgramDetail.css";

function ProgramDetail() {
  // useParams() reads the dynamic part of the URL.
  // If the URL is /programs/strength-foundations, then
  // params.id will be the text "strength-foundations".
  const params = useParams();
  const programId = params.id;

  // Look through our program data to find the one
  // whose id matches the id from the URL.
  let foundProgram = null;
  for (let i = 0; i < programsData.length; i++) {
    if (programsData[i].id === programId) {
      foundProgram = programsData[i];
    }
  }

  // If nobody matched (someone typed a bad URL), send them
  // back to the programs list instead of showing a blank page.
  if (!foundProgram) {
    return <Navigate to="/programs" replace />;
  }

  // Find the trainer object that matches this program's trainer name
  let trainer = null;
  for (let i = 0; i < trainersData.length; i++) {
    if (trainersData[i].name === foundProgram.trainer) {
      trainer = trainersData[i];
    }
  }

  // Find up to 2 other programs in the same category, to show
  // as "related programs" at the bottom of the page.
  const relatedPrograms = programsData
    .filter((p) => p.id !== foundProgram.id && p.category === foundProgram.category)
    .slice(0, 2);

  return (
    <main>
      <section className="program-detail-hero">
        <img
          src={foundProgram.image}
          alt={foundProgram.name}
          className="program-detail-hero-image"
        />
        <div className="program-detail-hero-overlay"></div>

        <div className="container program-detail-hero-content">
          <Link to="/programs" className="program-detail-back-link">← All programs</Link>
          <span className="tag">{foundProgram.category}</span>
          <h1 className="program-detail-title">{foundProgram.name}</h1>
          <p className="program-detail-tagline">{foundProgram.tagline}</p>
          <p className="program-detail-meta">
            {foundProgram.level} · {foundProgram.duration} per session · Coach {foundProgram.trainer}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container program-detail-grid">
          <div>
            <h2 className="program-detail-heading">What this program is</h2>
            <p className="program-detail-text">{foundProgram.description}</p>

            <h2 className="program-detail-heading">What a week covers</h2>
            <p className="program-detail-text">{foundProgram.details}</p>

            <h2 className="program-detail-heading">Movement focus</h2>
            <div className="program-detail-focus-tags">
              {foundProgram.focus.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>

            <div className="program-detail-cta-buttons">
              <Link to="/join" className="btn btn-orange">Book this program</Link>
              <Link to="/plans" className="btn btn-outline">See it on the 30–90 day plan</Link>
            </div>
          </div>

          <aside>
            {trainer && (
              <div className="program-detail-trainer-box">
                <img src={trainer.image} alt={trainer.name} />
                <div>
                  <p className="program-detail-trainer-name">{trainer.name}</p>
                  <p className="program-detail-trainer-role">{trainer.role}</p>
                </div>
              </div>
            )}

            <div className="program-detail-fact-box">
              <span>Level</span>
              <span>{foundProgram.level}</span>
            </div>
            <div className="program-detail-fact-box">
              <span>Session length</span>
              <span>{foundProgram.duration}</span>
            </div>
            <div className="program-detail-fact-box">
              <span>Category</span>
              <span>{foundProgram.category}</span>
            </div>
          </aside>
        </div>
      </section>

      {relatedPrograms.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <p className="eyebrow">Related programs</p>
            <h2 className="section-title">Pairs well with this one</h2>

            <div className="program-detail-related-grid">
              {relatedPrograms.map((relatedProgram) => (
                <Link
                  key={relatedProgram.id}
                  to={`/programs/${relatedProgram.id}`}
                  className="program-detail-related-card"
                >
                  <img src={relatedProgram.image} alt={relatedProgram.name} />
                  <div>
                    <h3>{relatedProgram.name}</h3>
                    <p>{relatedProgram.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default ProgramDetail;

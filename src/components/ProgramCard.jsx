import { Link } from "react-router-dom";
import "./ProgramCard.css";

// This component shows ONE program in a card.
// The "program" object is passed in as a prop from whichever
// page is using this component (Home.jsx or Programs.jsx).
function ProgramCard({ program }) {
  return (
    <div className="card program-card">
      <div className="program-card-image-wrap">
        <img src={program.image} alt={program.name} />
        <span className="tag program-card-level">{program.level}</span>
      </div>

      <div className="program-card-body">
        <p className="eyebrow program-card-category">{program.category}</p>
        <h3 className="program-card-title">{program.name}</h3>
        <p className="program-card-tagline">{program.tagline}</p>
        <p className="program-card-meta">
          {program.duration} · Coach {program.trainer}
        </p>

        {/*
          Clicking this link takes the user to /programs/<the program id>.
          For example, /programs/strength-foundations.
          The ProgramDetail page reads that id from the URL and
          looks up the matching program to show the full details.
        */}
        <Link to={`/programs/${program.id}`} className="program-card-link">
          Learn the full plan →
        </Link>
      </div>
    </div>
  );
}

export default ProgramCard;

import "./TrainerCard.css";

function TrainerCard({ trainer }) {
  return (
    <div className="card trainer-card">
      <img className="trainer-card-image" src={trainer.image} alt={trainer.name} />

      <div className="trainer-card-body">
        <h3 className="trainer-card-name">{trainer.name}</h3>
        <p className="trainer-card-role">{trainer.role}</p>
        <p className="trainer-card-bio">{trainer.bio}</p>

        <div className="trainer-card-tags">
          {trainer.specialties.map((specialty) => (
            <span key={specialty} className="tag">{specialty}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrainerCard;

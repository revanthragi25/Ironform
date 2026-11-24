import TrainerCard from "../components/TrainerCard";
import trainersData from "../data/trainers.json";
import "./Trainers.css";

function Trainers() {
  return (
    <main>
      <section className="section trainers-hero">
        <div className="container">
          <p className="eyebrow">Coaches</p>
          <h1 className="section-title">The people who'll correct your form</h1>
          <p className="section-text">
            Every program on this site is run by one of these coaches.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trainers-grid">
            {trainersData.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Trainers;

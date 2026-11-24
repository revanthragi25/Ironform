import "./TestimonialCard.css";

function TestimonialCard({ testimonial }) {
  return (
    <div className="card testimonial-card">
      <p className="testimonial-quote">"{testimonial.quote}"</p>

      <div className="testimonial-footer">
        <img src={testimonial.image} alt={testimonial.name} className="testimonial-avatar" />
        <div>
          <p className="testimonial-name">{testimonial.name}</p>
          <p className="testimonial-result">{testimonial.result}</p>
        </div>
      </div>

      <span className="tag tag-green">{testimonial.program}</span>
    </div>
  );
}

export default TestimonialCard;

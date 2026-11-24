import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setMessageSent(true);
  }

  return (
    <main>
      <section className="section contact-hero">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Questions before you join? Ask here</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="contact-info-box">
              <h4>Visit</h4>
              <p>221B Forge Street, Hyderabad</p>
            </div>
            <div className="contact-info-box">
              <h4>Hours</h4>
              <p>Mon–Sat: 5am – 11pm</p>
              <p>Sun: 7am – 6pm</p>
            </div>
            <div className="contact-info-box">
              <h4>Email</h4>
              <p>hello@ironform.gym</p>
            </div>
          </div>

          <div>
            {messageSent ? (
              <div className="contact-success">
                <span>✓</span>
                <p>Message sent. We'll reply within one business day.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                  <span>Name</span>
                  <input type="text" required placeholder="Your name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" required placeholder="you@email.com" />
                </label>
                <label>
                  <span>Message</span>
                  <textarea required rows={5} placeholder="What can we help with?"></textarea>
                </label>
                <button type="submit" className="btn btn-orange">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;

import "./SafetyNote.css";

// A simple warning-style box. Just displays the title and detail
// text that's passed in - no state, no logic.
function SafetyNote({ note }) {
  return (
    <div className="safety-note">
      <span className="safety-note-icon">⚠</span>
      <div>
        <h4 className="safety-note-title">{note.title}</h4>
        <p className="safety-note-detail">{note.detail}</p>
      </div>
    </div>
  );
}

export default SafetyNote;

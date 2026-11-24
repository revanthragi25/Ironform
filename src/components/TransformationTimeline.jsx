import { useState } from "react";
import "./TransformationTimeline.css";

// This component shows the 30/60/90 day tabs and the
// week-by-week list for whichever tab is currently selected.
function TransformationTimeline({ plans }) {
  // We store the ID of the currently selected plan (e.g. "30-day").
  // We start with the first plan in the list selected by default.
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);

  // Find the full plan object that matches the selected ID.
  // We do this every render instead of storing the whole object in
  // state, so it can never go "out of sync" with selectedPlanId.
  let selectedPlan = plans[0];
  for (let i = 0; i < plans.length; i++) {
    if (plans[i].id === selectedPlanId) {
      selectedPlan = plans[i];
    }
  }

  return (
    <div>
      {/* The three tab buttons: 30 Days / 60 Days / 90 Days */}
      <div className="timeline-tabs">
        {plans.map((plan) => (
          <button
            key={plan.id}
            className={
              plan.id === selectedPlanId
                ? "timeline-tab timeline-tab-active"
                : "timeline-tab"
            }
            onClick={() => setSelectedPlanId(plan.id)}
          >
            <span className="timeline-tab-label">{plan.label}</span>
            <span className="timeline-tab-title">{plan.title}</span>
          </button>
        ))}
      </div>

      {/* The content for whichever plan is currently selected */}
      <p className="timeline-goal">{selectedPlan.goal}</p>

      <div className="timeline-weeks">
        {selectedPlan.weeks.map((week, index) => (
          <div className="timeline-week" key={week.week}>
            <div className="timeline-week-number">{index + 1}</div>

            <div className="timeline-week-box">
              <div className="timeline-week-header">
                <h4>{week.week}</h4>
                <span className="tag tag-green">{week.focus}</span>
              </div>

              <div className="timeline-week-grid">
                <div>
                  <p className="timeline-week-label">Training</p>
                  <p className="timeline-week-value">{week.training}</p>
                </div>
                <div>
                  <p className="timeline-week-label">Diet</p>
                  <p className="timeline-week-value">{week.diet}</p>
                </div>
                <div>
                  <p className="timeline-week-label">Milestone</p>
                  <p className="timeline-week-value">{week.milestone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransformationTimeline;

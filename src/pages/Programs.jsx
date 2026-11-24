import { useState } from "react";
import ProgramCard from "../components/ProgramCard";
import programsData from "../data/programs.json";
import "./Programs.css";

// Build a list of category names from the program data, with
// "All" added at the start. We use a Set to remove duplicates.
const allCategories = ["All", ...new Set(programsData.map((p) => p.category))];

function Programs() {
  // Remembers which category button is currently selected
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Work out which programs to actually show based on the
  // selected category. If "All" is selected, show everything.
  let programsToShow = programsData;
  if (selectedCategory !== "All") {
    programsToShow = programsData.filter((p) => p.category === selectedCategory);
  }

  return (
    <main>
      <section className="section programs-hero">
        <div className="container">
          <p className="eyebrow">Programs</p>
          <h1 className="section-title">A program for every stage</h1>
          <p className="section-text">
            Click a category to filter, or click any program to see the full breakdown.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="category-filter">
            {allCategories.map((category) => (
              <button
                key={category}
                className={
                  category === selectedCategory
                    ? "category-button category-button-active"
                    : "category-button"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="programs-count">{programsToShow.length} programs</p>

          <div className="grid-3">
            {programsToShow.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Programs;

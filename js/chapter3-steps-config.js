const chapter3StepsConfig = [
  {
    id: "chapter-3",
    text: "Context matters. Many authors see fire and fan flames. Others see fire and wonder what caused it.",
    fullwidth: true,
    fadeIn: true,
    fadeOut: true,
    customClass: "header",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
    },
  },
  {
    id: "celebrity-authors",
    text: "There are some who publish an appropriate number of books. A number that indicates less ghost writing and more research.",
    fullwidth: true,
    fadeIn: true,
    render: () => {
      // Clear existing content
      const figure = d3.select("#figure-container");
      figure.html("");

      // Create a container for the chapter-3 visualization
      const vizContainer = figure
        .append("div")
        .attr("id", "chapter-3")
        .style("width", "100%")
        .style("height", "100%");

      // Load and execute chapter-3-dev.js
      const script = document.createElement("script");
      script.src = "chapter-3-dev.js";
      document.body.appendChild(script);

      // Dispatch an initialization event
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "authors-1" },
          })
        );
      }, 100);
    },
  },

  {
    id: "quality-authors",
    text: "There are some who are beloved, with ratings in the top 10% of all authors.",
    fullwidth: true,
    render: () => {
      // Ensure 2D visualization is loaded
      let vizContainer = d3.select("#chapter-3");
      if (vizContainer.empty()) {
        const figure = d3.select("#figure-container");
        figure.html("");

        vizContainer = figure
          .append("div")
          .attr("id", "chapter-3")
          .style("width", "100%")
          .style("height", "100%");

        // Load and execute chapter-3-dev.js
        const script = document.createElement("script");
        script.src = "chapter-3-dev.js";
        document.body.appendChild(script);
      }

      // Dispatch the visualization update
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "authors-2" },
          })
        );
      }, 100);
    },
  },

  {
    id: "credibility-score",
    text: `Then there are those who I've heard referred to as "drug dealers." This may seem excessive, but when you see titles like "You Are a Badass" and "Turn Your Weight Loss Vision Into Reality!", tell me you don't want a taste.`,
    fullwidth: true,
    render: () => {
      // Ensure 2D visualization is loaded
      let vizContainer = d3.select("#chapter-3");
      if (vizContainer.empty()) {
        const figure = d3.select("#figure-container");
        figure.html("");

        vizContainer = figure
          .append("div")
          .attr("id", "chapter-3")
          .style("width", "100%")
          .style("height", "100%");

        // Load and execute chapter-3-dev.js
        const script = document.createElement("script");
        script.src = "chapter-3-dev.js";
        document.body.appendChild(script);
      }

      // Dispatch the visualization update
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "authors-3" },
          })
        );
      }, 100);
    },
  },
  {
    id: "earned-credibility",
    text: "If we expand this visualization to include another metric, credibility score, we can see those at the top are people like Elisabeth Kübler-Ross, who gave us the Five Stages of Grief, and Dr. Gabor Maté, whose writing on addiction has helped tens of millions.",
    fullwidth: true,
    fadeIn: true,
    fadeOut: false,
    render: () => {
      // Only create the container if it doesn't exist
      let vizContainer = d3.select("#chapter-3-3d");
      if (vizContainer.empty()) {
        const figure = d3.select("#figure-container");
        figure.html("");

        vizContainer = figure
          .append("div")
          .attr("id", "chapter-3-3d")
          .style("width", "100%")
          .style("height", "100%");

        // Load and execute chapter-3-3d.js only if not already loaded
        if (!window.chapter3_3d_loaded) {
          const script = document.createElement("script");
          script.src = "chapter-3-3d.js";
          document.body.appendChild(script);
          window.chapter3_3d_loaded = true;
        }
      }

      // Dispatch the visualization update
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "earned-credibility" },
          })
        );
      }, 100);
    },
  },
  {
    id: "l-ron-hubbard",
    text: "On the other hand, you have authors like L. Ron Hubbard, the founder of Scientology, and Kevin Trudeau, a literal convicted felon because his self help series was actually a pyramid scheme, and PT Barnum, the showman who once sewed a monkey torso to a fish tail and convinced audiences it was a mermaid. He sold books about personal finance.",
    fullwidth: true,
    fadeIn: false,
    fadeOut: true,
    render: () => {
      // Ensure 3D visualization is loaded
      let vizContainer = d3.select("#chapter-3-3d");
      if (vizContainer.empty()) {
        const figure = d3.select("#figure-container");
        figure.html("");

        vizContainer = figure
          .append("div")
          .attr("id", "chapter-3-3d")
          .style("width", "100%")
          .style("height", "100%");

        // Load and execute chapter-3-3d.js only if not already loaded
        if (!window.chapter3_3d_loaded) {
          const script = document.createElement("script");
          script.src = "chapter-3-3d.js";
          document.body.appendChild(script);
          window.chapter3_3d_loaded = true;
        }
      }

      // Dispatch the visualization update
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "low-credibility" },
          })
        );
      }, 100);
    },
  },

  {
    id: "conclusion",
    text: "The problem with fixing yourself.",
    fullwidth: true,
    customClass: "header",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");

      // Add a "Back to Beginning" button at the end
      setTimeout(() => {
        const button = figure
          .append("div")
          .style("position", "absolute")
          .style("bottom", "2rem")
          .style("right", "2rem")
          .style("background", "var(--color-orange)")
          .style("color", "white")
          .style("padding", "1rem 2rem")
          .style("border-radius", "30px")
          .style("cursor", "pointer")
          .style("font-family", "Andale Mono, monospace")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .style("letter-spacing", "2px")
          .style("text-transform", "uppercase")
          .style("box-shadow", "0 4px 15px rgba(0,0,0,0.2)")
          .style("transition", "all 0.3s ease")
          .style("z-index", "9999")
          .style("opacity", "0")
          .text("← Back to Beginning")
          .on("click", () => {
            window.location.href = "index.html";
          })
          .on("mouseover", function () {
            d3.select(this)
              .style("background", "var(--color-teal)")
              .style("transform", "scale(1.05)");
          })
          .on("mouseout", function () {
            d3.select(this)
              .style("background", "var(--color-orange)")
              .style("transform", "scale(1)");
          });

        // Fade in the button
        button.transition().duration(1000).style("opacity", "1");
      }, 1000);
    },
  },
];

// Make steps available globally
window.stepsConfig = chapter3StepsConfig;

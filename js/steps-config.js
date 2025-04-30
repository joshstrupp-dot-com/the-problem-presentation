const stepsConfig = [
  {
    id: "chapter-1",
    text: `Life is hard. Advice can help. And there <video src="assets/videos/yt1.mp4" style="display: inline-block; width: 125px; vertical-align: middle; margin: 0 5px;" autoplay muted loop playsinline></video>  is no <video src="assets/videos/yt2.mp4" style="display: inline-block; width: 125px; vertical-align: middle; margin: 0 5px;" autoplay muted loop playsinline></video> shortage 
     of <video src="assets/videos/yt3.mp4" style="display: inline-block; width: 125px; vertical-align: middle; margin: 0 5px;" autoplay muted loop playsinline></video> advice.`,
    fullwidth: true,
    customClass: "header",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
    },
  },

  {
    id: "quick-fixes",
    text: "You're one Amazon order from never aging again. You're 8 minutes from knowing all of Wall Street's secrets.",
    fullwidth: true,
    fadeIn: true,
    fadeOut: true,
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");

      // Add scrolling words animation container
      const container = figure
        .append("div")
        .style("height", "100%")
        .style("display", "flex")
        .style("align-items", "center")
        .style("justify-content", "center");

      // Create a search bar container
      const searchBarContainer = container
        .append("div")
        .style("border", "1px solid black")
        .style("border-radius", "100px")
        .style("margin-left", "6em")
        .style("margin-right", "6em")
        .style("display", "flex")
        .style("align-items", "center")
        .style("padding", "8px 8px")
        .style("box-shadow", "0px 0px 20px rgba(0, 0, 0, 0.1)");
      // Add the search icon
      searchBarContainer
        .append("img")
        .attr("src", "assets/search-icon.svg")
        .style("height", "26px")
        .style("padding-left", "10px")
        .style("margin-right", "20px");

      // Create the scrolling words container
      const scrollingContainer = searchBarContainer
        .append("div")
        .attr("class", "scrolling-words-container")
        .style("display", "flex")
        .style("align-items", "center")
        .style("font-size", "1.5rem")
        .style("font-weight", "600")
        .style("font-family", "Andale Mono, monospace");

      // Create the scrolling words box
      const scrollingBox = scrollingContainer
        .append("div")
        .attr("class", "scrolling-words-box")
        .style("height", "3rem") // Increased height by 10px (from 3rem to 3.625rem)
        .style("margin", "auto")
        .style("overflow", "hidden");
      // .style("border", "1px solid black")
      // .style("border-radius", "100px");

      // Create the list of scrolling words
      const wordsList = scrollingBox
        .append("ul")
        .style("margin", "0 0.625rem")
        .style("padding", "0")
        .style("animation", "scrollUp 25s infinite"); // Doubled the animation duration to slow it down

      // Add the scrolling words
      const words = [
        { text: "am I a bad parent?", color: "#000" },
        { text: "how to stop overthinking", color: "#000" },
        { text: "why do I feel alone?", color: "#000" },
        { text: "handling imposter syndrome", color: "#000" },
        { text: "six pack abs in 30 days", color: "#000" },
        { text: 'What is "Self-Help?"', color: "#000" },
      ];
      words.forEach((word) => {
        wordsList
          .append("li")
          .style("display", "flex")
          .style("align-items", "center")
          .style("justify-content", "flex-start")
          .style("height", "3rem")
          .style("list-style", "none")
          .style("color", word.color)
          .text(word.text);
      });

      // Add the keyframes for the scrolling animation
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        @keyframes scrollUp {
          0%, 8% {
            transform: translateY(0%);
          }
          10%, 18% {
            transform: translateY(-16.67%);
          }
          20%, 28% {
            transform: translateY(-33.33%);
          }
          30%, 38% {
            transform: translateY(-50%);
          }
          40%, 48% {
            transform: translateY(-66.67%);
          }
          50%, 100% {
            transform: translateY(-83.33%);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    },
  },
  // {
  //   id: "self-help",
  //   text: "SELF HELP",
  //   customClass: "header",
  //   render: () => {
  //     const figure = d3.select("#figure-container");
  //     figure.html("");
  //   },
  // },

  {
    id: "blame-game",
    text: "Self-help literature is the fastest growing nonfiction genre since 2013. ",
    fullwidth: true,
    render: () => {
      // Clear existing content
      const figure = d3.select("#figure-container");
      figure.html("");

      // Create a container for the grid visualization
      const vizContainer = figure
        .append("div")
        .attr("id", "chapter-1-grid")
        .style("width", "100%")
        .style("height", "100%");

      // Load and execute chapter-1-grid.js
      const script = document.createElement("script");
      script.src = "chapter-1-grid.js";
      document.body.appendChild(script);

      // Dispatch an initialization event
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("gridVisualizationUpdate", {
            detail: { step: "blame-game" },
          })
        );
      }, 500);
    },
  },

  {
    id: "blame-game-2",
    text: "Some of these books contain researched, proven advice. But others are, unfortunately, capitalizing off our fears.",
    fullwidth: true,
    render: () => {
      // Update the existing grid visualization
      document.dispatchEvent(
        new CustomEvent("gridVisualizationUpdate", {
          detail: { step: "blame-game-2" },
        })
      );
    },
  },
  {
    id: "blame-game-3",
    text: "There are authors who have something to gain by convincing you that your dead-end job is your fault and yours to fix; or that you're depressed because you're not doing enough squat jumps. When self-help suggests you're not doing enough, it's a smoke screen. It's fear-mongering masquerading as advice.",
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Update the existing grid visualization
      document.dispatchEvent(
        new CustomEvent("gridVisualizationUpdate", {
          detail: { step: "blame-game-3" },
        })
      );
    },
  },
  {
    id: "systemic-problems",
    text: "Our anxieties are often the result of historical events outside of our control — and some authors point the blame at you for profit.",
    fullwidth: true,
    customClass: "header",
    render: () => {
      // Update the existing grid visualization
      document.dispatchEvent(
        new CustomEvent("gridVisualizationUpdate", {
          detail: { step: "systemic-problems" },
        })
      );
    },
  },
  {
    id: "fastest-growing",
    text: "I used machine learning to classify 20,000 books",
    fullwidth: true,
    render: () => {
      // Clear existing content
      const figure = d3.select("#figure-container");
      figure.html("");

      // Create a container for the chapter-1 visualization
      const vizContainer = figure
        .append("div")
        .attr("id", "chapter-1")
        .style("width", "100%")
        .style("height", "100%");

      // Load and execute chapter-1-dev.js
      const script = document.createElement("script");
      script.src = "chapter-1-dev.js";
      document.body.appendChild(script);

      // Dispatch an initialization event
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "intro" },
          })
        );
      }, 500);
    },
  },

  // {
  //   id: "two-analyses",
  //   text: ".",
  //   fullwidth: true,
  //   customClass: "statement",
  //   render: () => {
  //     // Keep the existing visualization in its intro state
  //     document.dispatchEvent(
  //       new CustomEvent("visualizationUpdate", {
  //         detail: { step: "book-emphasis-closed" },
  //       })
  //     );
  //   },
  // },

  {
    id: "ml-categories",
    text: "into 10 categories that designate what problem they aim to address, then organized them into two umbrella categories. Books that claim the problem comes from:",
    fullwidth: true,
    render: () => {
      // Update to intro-2 step
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "intro-2" },
        })
      );
    },
  },
  {
    id: "external-internal-sort",
    text: "THE WORLD — think society, family, metaphysics. <br><br> YOU — think self-esteem, willpower, internalized doubt",
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Empty placeholder for this step
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "external-internal-sort" },
        })
      );
    },
  },
  // {
  //   id: "chapter-2",
  //   text: "Chapter 2",
  //   fullwidth: true,
  //   fadeIn: true,
  //   fadeOut: true,
  //   customClass: "header",
  //   render: () => {
  //     const figure = d3.select("#figure-container");
  //     figure.html("");
  //   },
  // },
  {
    id: "samuel-smiles",
    text: "The very first Self Help book was a response to poor working conditions.",
    fullwidth: true,
    render: () => {
      // Clear existing content
      const figure = d3.select("#figure-container");
      figure.html("");

      // Create a container for the chapter-2 visualization
      const vizContainer = figure
        .append("div")
        .attr("id", "chapter-2")
        .style("width", "100%")
        .style("height", "100%");

      // Load and execute chapter-2-dev.js
      const script = document.createElement("script");
      script.src = "chapter-2-dev.js";
      document.body.appendChild(script);

      // Dispatch an initialization event
      setTimeout(() => {
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "samuel-smiles" },
          })
        );
      }, 100);
    },
  },
  // {
  //   id: "smiles-context",
  //   text: "In Smiles' day, many had moved from farms to factories, where they found themselves diseased and exploited. The rich grew richer while social mobility for the working class was nearly impossible. It makes sense, then, that the Protestant values of hard work, thrift, and personal responsibility seemed virtuous when investment in society was failing.",
  //   fullwidth: true,
  //   render: () => {
  //     // Just update the existing visualization
  //     document.dispatchEvent(
  //       new CustomEvent("visualizationUpdate", {
  //         detail: { step: "samuel-smiles" },
  //       })
  //     );
  //   },
  // },
  // {
  //   id: "turn-of-century",
  //   text: 'At the turn of the century, some scholars referred to these emergent self help books as "success gospel," which, if you ask me, is prophetic. The self help market blossomed into a genre that towed the line between moral uplift and material gain.',
  //   fullwidth: true,
  //   render: () => {
  //     // Just update the existing visualization
  //     document.dispatchEvent(
  //       new CustomEvent("visualizationUpdate", {
  //         detail: { step: "turn-of-century" },
  //       })
  //     );
  //   },
  // },
  // {
  //   id: "through-ww1",
  //   text: "Books about finding spiritual and religious meaning begin to rise in the wake of war. Why wouldn’t they? Your neighbor may be a German spy or worse: a communist. Like Smiles’ readers, these Americans, rightfully so, hope to find some semblance of control when your fate is oversees in the hands of 4.7 million young privates.",
  //   fullwidth: true,
  //   render: () => {
  //     // Just update the existing visualization
  //     document.dispatchEvent(
  //       new CustomEvent("visualizationUpdate", {
  //         detail: { step: "through-ww1" },
  //       })
  //     );
  //   },
  // },
  {
    id: "post-20s",
    text: "This trend of responding to external forces continued until The Great Depression gave rise to entirely new sub-genres of self-help — books that see stock markets crash and claim you “win friends and influence people” or use “the power of positive thinking” to take back control.",
    fullwidth: true,
    render: () => {
      // Just update the existing visualization
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "post-20s" },
        })
      );
    },
  },

  {
    id: "neoliberal-shift",
    text: "Eventually we get to the “Me Decade.” Flower power blossomed and Watergate sowed doubt, Reagan Era neoliberalism was on the rise. “YOU can take care of yourself” became the common sentiment. Suddenly, book shelves saw fewer guides to changing the world, and more manuals for changing yourself.",
    fullwidth: true,
    render: () => {
      // Just update the existing visualization
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "neoliberal-shift" },
        })
      );
    },
  },

  {
    id: "all-years",
    text: "The gap finally closes as we enter the 21st century. Self-help pivots toward coping and finding resilience within yourself. Many authors push “personal hustle” as a response to economic insecurity, or “leaning in” first, addressing sexism second.",
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Just update the existing visualization
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "all-years" },
        })
      );
    },
  },
  {
    id: "chapter-3",
    text: "The point is this: context matters. Many authors see fire and fan flames. Others see fire and wonder what caused it. Let’s see who’s who",
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
      // Maintain the credibility-score state
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "authors-2" },
        })
      );
    },
  },

  {
    id: "credibility-score",
    text: "Then there are those who I’ve heard referred to as “drug dealers.” This may seem excessive, but when you see titles like “You Are a Badass” and“Turn Your Weight Loss Vision Into Reality!,” tell me you don’t want a taste.",
    fullwidth: true,
    render: () => {
      // Maintain the credibility-score state
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "authors-3" },
        })
      );
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
      // Simply update the visualization state
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "low-credibility" },
        })
      );
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
    },
  },
];

// Make steps available globally
window.stepsConfig = stepsConfig;

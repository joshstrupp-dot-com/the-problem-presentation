const stepsConfig = [
  {
    id: "chapter-1",
    text: "Life can really suck. Advice can help. And there is no shortage of advice",
    fullwidth: true,
    customClass: "header",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
    },
  },
  // {
  //   id: "intro",
  //   text: "Life can really suck. Advice can help. And there is no shortage of advice.",
  //   fullwidth: true,
  //   customClass: "statement",
  //   render: () => {
  //     const figure = d3.select("#figure-container");
  //     figure.html("");
  //   },

  {
    id: "quick-fixes",
    text: "Life can really suck. Advice can help. And there is no shortage of advice.You're one Amazon order from never aging again. You're 8 minutes from knowing all of Wall Street's secrets.",
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
        .style("animation", "scrollUp 40s infinite"); // Doubled the animation duration to slow it down

      // Add the scrolling words
      const words = [
        { text: "why do I feel stuck", color: "#000" },
        { text: "how to stop overthinking", color: "#000" },
        { text: "can people really change?", color: "#000" },
        {
          text: "how to be more confident",
          color: "#000",
        },
        { text: "fix my relationship", color: "#000" },
        { text: "IM SO ANXIOUS HALP", color: "#000" },
        {
          text: "I hate my job, now what?",
          color: "#000",
        },
        {
          text: "why am I always tired + unmotivated",
          color: "#000",
        },
        { text: "make friends as an adult", color: "#000" },
        {
          text: "how to forgive someone who hurt me",
          color: "#000",
        },
        { text: "best way to build new habits", color: "#000" },
        { text: "how to stop comparing myself", color: "#000" },
        { text: "what to do with my life", color: "#000" },
        {
          text: "how to believe in myself again",
          color: "#000",
        },
        { text: "is therapy worth it", color: "#000" },
        {
          text: "how 2 stop being a people pleaser",
          color: "#000",
        },
        {
          text: "how to set boundaries without feeling guilty",
          color: "#000",
        },
        { text: "how to start over in life", color: "#000" },
        {
          text: "how to heal from childhood trauma",
          color: "#000",
        },
        { text: "how to stop self-sabotaging", color: "#000" },
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
            transform: translateY(-5%);
          }
          20%, 28% {
            transform: translateY(-10%);
          }
          30%, 38% {
            transform: translateY(-15%);
          }
          40%, 48% {
            transform: translateY(-20%);
          }
          50%, 58% {
            transform: translateY(-25%);
          }
          60%, 68% {
            transform: translateY(-30%);
          }
          70%, 78% {
            transform: translateY(-35%);
          }
          80%, 88% {
            transform: translateY(-40%);
          }
          90%, 98% {
            transform: translateY(-45%);
          }
          100% {
            transform: translateY(0%);
          }
        }
      `;
      document.head.appendChild(styleSheet);
    },
  },
  {
    id: "self-help",
    text: "SELF HELP",
    customClass: "statement",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
    },
  },
  // {
  //   id: "self-help-growth",
  //   text: "Self-help literature is the fastest growing nonfiction genre since 2013.",
  //   fullwidth: true,
  //   fadeIn: true,
  //   fadeOut: true,
  //   render: () => {
  //     const figure = d3.select("#figure-container");
  //     figure.html("");

  //     // Create SVG for the exponential growth line
  //     const width = figure.node().getBoundingClientRect().width;
  //     const height = figure.node().getBoundingClientRect().height;
  //     const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  //     const svg = figure
  //       .append("svg")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .style("overflow", "visible");

  //     // Create the exponential curve path
  //     const generateExponentialPoints = () => {
  //       const points = [];
  //       const numPoints = 100;
  //       for (let i = 0; i < numPoints; i++) {
  //         const x = i / (numPoints - 1);
  //         // Exponential function: y = e^(ax) - 1 (normalized)
  //         const y = Math.exp(3 * x) - 1;
  //         points.push([
  //           margin.left + x * (width - margin.left - margin.right),
  //           height -
  //             margin.bottom -
  //             (y * (height - margin.top - margin.bottom)) / (Math.exp(3) - 1),
  //         ]);
  //       }
  //       return points;
  //     };

  //     const points = generateExponentialPoints();
  //     const lineGenerator = d3.line();

  //     // Create path element
  //     const path = svg
  //       .append("path")
  //       .attr("d", lineGenerator(points))
  //       .attr("fill", "none")
  //       .attr("stroke", "#333")
  //       .attr("stroke-width", 2)
  //       .attr("stroke-dasharray", function () {
  //         return this.getTotalLength();
  //       })
  //       .attr("stroke-dashoffset", function () {
  //         return this.getTotalLength();
  //       });

  //     // Animate the path drawing
  //     path
  //       .transition()
  //       .duration(2000)
  //       .ease(d3.easeQuadInOut)
  //       .attr("stroke-dashoffset", 0);

  //     // Get the total length of the path for animation calculations
  //     const pathLength = path.node().getTotalLength();

  //     // Create a second path for the text to follow, offset from the main path
  //     const generateOffsetPoints = () => {
  //       const offsetPoints = [];
  //       const numPoints = 100;
  //       for (let i = 0; i < numPoints; i++) {
  //         const x = i / (numPoints - 1);
  //         // Exponential function: y = e^(ax) - 1 (normalized)
  //         const y = Math.exp(3 * x) - 1;
  //         offsetPoints.push([
  //           margin.left + x * (width - margin.left - margin.right) - 5, // 5 pixels to the left
  //           height -
  //             margin.bottom -
  //             (y * (height - margin.top - margin.bottom)) / (Math.exp(3) - 1) -
  //             20, // 20 pixels higher
  //         ]);
  //       }
  //       return offsetPoints;
  //     };

  //     const offsetPoints = generateOffsetPoints();

  //     // Create marquee text effect along the path (only on one side)
  //     // Create a defs element for the path
  //     const defs = svg.append("defs");

  //     // Create a path for the text to follow
  //     const textPath = defs
  //       .append("path")
  //       .attr("id", "textPath-marquee")
  //       .attr("d", lineGenerator(offsetPoints));

  //     // Load self-help book titles from CSV
  //     d3.csv("data/sh_0415_time/sh_0415_time.csv")
  //       .then((data) => {
  //         // Take the first 50 book titles
  //         const bookTitles = data.slice(0, 20).map((d) => d.name);

  //         // Create a text element
  //         const text = svg
  //           .append("text")
  //           .attr("font-family", "Andale Mono, monospace")
  //           .attr("font-size", "25px")
  //           .attr("fill", "#333");

  //         // Join all titles with a separator
  //         const allTitlesText = bookTitles.join(" • ");
  //         const textWidth = allTitlesText.length * 5; // Approximate width in pixels

  //         // Create textPath for the titles
  //         const textPath = text
  //           .append("textPath")
  //           .attr("href", "#textPath-marquee")
  //           .attr("startOffset", "0%")
  //           .text(allTitlesText);

  //         // Animate the text element - moving along the path
  //         function animateMarquee() {
  //           text
  //             .attr("data-offset", 0)
  //             .transition()
  //             .duration(50000) // Longer duration for the longer text
  //             .ease(d3.easeLinear)
  //             .attrTween("data-offset", function () {
  //               return function (t) {
  //                 // Calculate the offset to create a continuous scrolling effect
  //                 const offset = (100 * t) % 100;
  //                 textPath.attr("startOffset", `${-offset}%`);
  //                 return t * 100;
  //               };
  //             })
  //             .on("end", animateMarquee);
  //         }

  //         animateMarquee();
  //       })
  //       .catch((error) => {
  //         console.error("Error loading CSV file:", error);

  //         // Fallback in case the CSV fails to load
  //         const text = svg
  //           .append("text")
  //           .attr("font-family", "Andale Mono, monospace")
  //           .attr("font-size", "12px")
  //           .attr("fill", "#333");

  //         text
  //           .append("textPath")
  //           .attr("href", "#textPath-marquee")
  //           .attr("startOffset", "0%")
  //           .text("Self-help literature growth");
  //       });
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
    id: "systemic-problems",
    text: "Some of these books contain researched, proven advice. But others are, unfortunately, capitalizing off our fears. There are authors who have something to gain by convincing you that your dead-end job is your fault and yours to fix; or that you’re depressed because you’re not doing enough squat jumps. When self-help suggests you’re not doing enough, it’s a smoke screen. It’s fear-mongering masquerading as advice.",
    fullwidth: true,
    fadeOut: true,
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
    id: "detracts-from-point",
    text: "It detracts from my point: our anxieties are often the result of historical events outside of our control — and some authors point the blame at you for profit.",
    fullwidth: true,
    customClass: "statement",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
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
    id: "external-internal",
    text: "THE WORLD — think society, family, metaphysics. <br><br> YOU — think self-esteem, willpower, internalized doubt",
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Empty placeholder for this step
      document.dispatchEvent(
        new CustomEvent("visualizationUpdate", {
          detail: { step: "external-internal" },
        })
      );
    },
  },
  {
    id: "chapter-2",
    text: "Chapter 2",
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
    fadeOut: false,
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
    text: "To wrap it up: in an effort to address my disillusionment with self-help, I wrote a thesis about self help, which, in a way, ended up kinda being self help. I feel it’s turned the genre into two genres: books about “solutions” and books about “clarity.” A broken arm is a broken arm. A persistent fear of failure — less clear. I think “the problem with fixing yourself,” is that you can’t. And thats ok.My hope is that this thesis can serve as self help in and of itself, to others like me.",
    fullwidth: true,
    customClass: "statement",
    render: () => {
      const figure = d3.select("#figure-container");
      figure.html("");
    },
  },
];

// Make steps available globally
window.stepsConfig = stepsConfig;

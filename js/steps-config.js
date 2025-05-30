const stepsConfig = [
  {
    id: "chapter-1",
    text: `<span style="opacity: 0.4">Life is hard. Advice can help.</span> And there <video src="assets/videos/yt1.mp4" style="display: inline-block; width: 125px; vertical-align: middle; margin: 0 5px;" autoplay muted loop playsinline></video>  is no <video src="assets/videos/yt2.mp4" style="display: inline-block; width: 125px; vertical-align: middle; margin: 0 5px;" autoplay muted loop playsinline></video> shortage 
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
        .style("padding", "10px 20px")
        .style("box-shadow", "0 0 30px rgba(0, 0, 0, 0.1)");
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
        .style("font-weight", "100")
        .style("font-family", "Andale Mono, monospace");

      // Create the scrolling words box
      const scrollingBox = scrollingContainer
        .append("div")
        .attr("class", "scrolling-words-box")
        .style("height", "3rem")
        .style("margin", "auto")
        .style("overflow", "hidden");

      // Create the list of scrolling words
      const wordsList = scrollingBox
        .append("ul")
        .style("margin", "0 0.625rem")
        .style("padding", "0")
        .style("animation", "scrollUp 14s forwards"); // Changed to forwards instead of infinite

      // Add the scrolling words
      const words = [
        { text: "am I a bad parent?", color: "#000" },
        { text: "why do I feel alone?", color: "#000" },
        { text: "how to get six pack in 30 days?", color: "#000" },
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
          0%, 12% {
            transform: translateY(0%);
          }
          15%, 27% {
            transform: translateY(-25%);
          }
          30%, 42% {
            transform: translateY(-50%);
          }
          45%, 100% {
            transform: translateY(-75%);
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
    text: "There are authors who have something to gain by convincing you that your dead-end job is your fault and yours to fix; or that you're depressed because you're not doing enough squat jumps. ",
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
    text: "<span style='opacity: 0.4'>If it suggests you're not enough,</span> it's a smoke screen.",
    fullwidth: true,
    customClass: "header",
    render: () => {
      // Update the existing grid visualization
      document.dispatchEvent(
        new CustomEvent("gridVisualizationUpdate", {
          detail: { step: "systemic-problems" },
        })
      );
      // Remove any existing overlay to avoid duplicates
      d3.select("#background-images").remove();

      // Create a container for background images at the top level
      const bgContainer = d3
        .select("body")
        .append("div")
        .attr("id", "background-images")
        .style("position", "fixed")
        .style("top", "0")
        .style("left", "0")
        .style("width", "100vw")
        .style("height", "100vh")
        .style("pointer-events", "none")
        .style("z-index", "2000");

      // Get all PNG files from the directory
      fetch("assets/smoke-screen-images/")
        .then((response) => response.text())
        .then((data) => {
          // Parse HTML response to get all PNG files
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const files = Array.from(doc.querySelectorAll("a"))
            .map((a) => a.href)
            .filter((href) => href.endsWith(".png"));

          let remainingImages = [...files];
          let lastQuadrant = null;

          // Define quadrants
          const quadrants = [
            { name: "top", yRange: [0, 0.25] },
            { name: "right", yRange: [0.25, 0.75], xRange: [0.75, 1] },
            { name: "bottom", yRange: [0.75, 1] },
            { name: "left", yRange: [0.25, 0.75], xRange: [0, 0.25] },
          ];

          // Function to get next random image
          const getNextImage = () => {
            if (remainingImages.length === 0) {
              remainingImages = [...files];
            }
            const randomIndex = Math.floor(
              Math.random() * remainingImages.length
            );
            return remainingImages.splice(randomIndex, 1)[0];
          };

          // Function to get random position in a quadrant
          const getQuadrantPosition = (quadrant) => {
            let x, y;

            if (quadrant.name === "top") {
              x = Math.random() * (window.innerWidth - 150);
              y =
                window.innerHeight * quadrant.yRange[0] +
                Math.random() *
                  window.innerHeight *
                  (quadrant.yRange[1] - quadrant.yRange[0]);
            } else if (quadrant.name === "bottom") {
              x = Math.random() * (window.innerWidth - 150);
              y =
                window.innerHeight * quadrant.yRange[0] +
                Math.random() *
                  window.innerHeight *
                  (quadrant.yRange[1] - quadrant.yRange[0]);
            } else {
              x =
                window.innerWidth * quadrant.xRange[0] +
                Math.random() *
                  window.innerWidth *
                  (quadrant.xRange[1] - quadrant.xRange[0]);
              y =
                window.innerHeight * quadrant.yRange[0] +
                Math.random() *
                  window.innerHeight *
                  (quadrant.yRange[1] - quadrant.yRange[0]);
            }

            return { x, y };
          };

          // Function to get random quadrant (different from last one)
          const getRandomQuadrant = () => {
            let availableQuadrants = quadrants.filter(
              (q) => q.name !== lastQuadrant
            );
            const quadrant =
              availableQuadrants[
                Math.floor(Math.random() * availableQuadrants.length)
              ];
            lastQuadrant = quadrant.name;
            return quadrant;
          };

          // Function to create and animate a single image
          const createAnimatedImage = () => {
            // Check if we should continue - exit early if animation has been stopped
            if (!window.smokeScreenAnimationActive) {
              console.log("🛑 Smoke screen animation stopped");
              return;
            }

            const imageSrc = getNextImage();
            const quadrant = getRandomQuadrant();
            const position = getQuadrantPosition(quadrant);

            // Create image element
            const img = bgContainer
              .append("img")
              .attr("src", imageSrc)
              .style("position", "absolute")
              .style("width", "150px")
              .style("height", "auto")
              .style("opacity", "0")
              .style("transition", "opacity 2s ease-in-out")
              .style("z-index", "2001")
              .style("filter", "grayscale(100%)");

            img
              .style("left", `${position.x}px`)
              .style("top", `${position.y}px`);

            // Fade in
            setTimeout(() => {
              img.style("opacity", "0.3");

              // Start fade out after 5 seconds
              setTimeout(() => {
                img.style("opacity", "0");
                // Remove element after fade out completes
                setTimeout(() => {
                  img.remove();
                }, 2000);
              }, 5000);
            }, 100);

            // Schedule next image every 500ms - store timeout ID
            const timeoutId = setTimeout(createAnimatedImage, 500);

            // Track active timeouts
            if (!window.activeTimeouts) {
              window.activeTimeouts = [];
            }
            window.activeTimeouts.push(timeoutId);
          };

          // Set the flag to indicate animation is active
          window.smokeScreenAnimationActive = true;
          console.log("🎬 Starting smoke screen animation");

          // Start the animation after 1 second
          const initialTimeout = setTimeout(createAnimatedImage, 1000);

          // Track this timeout too
          if (!window.activeTimeouts) {
            window.activeTimeouts = [];
          }
          window.activeTimeouts.push(initialTimeout);
        });
    },
  },
  {
    id: "fastest-growing",
    text: "I used machine learning to classify 20,000 books",
    fullwidth: true,
    render: () => {
      // Fade out and remove all background images
      const bgContainer = d3.select("#background-images");
      if (!bgContainer.empty()) {
        bgContainer
          .selectAll("img")
          .style("transition", "opacity 1s ease-in-out")
          .style("opacity", "0");

        // Remove the container after fade out completes
        setTimeout(() => {
          bgContainer.remove();
        }, 1000);
      }

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
      // Check if chapter-1 visualization exists and has content
      const chapter1Container = d3.select("#chapter-1");
      const hasVisualization =
        !chapter1Container.empty() &&
        chapter1Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-1 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-1")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-1",
          "intro-2"
        );
      } else {
        // Update to intro-2 step
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "intro-2" },
          })
        );
      }
    },
  },
  {
    id: "external-internal-sort",
    text: "THE WORLD — think society, family, metaphysics. <br><br> YOU — think self-esteem, willpower, internalized doubt",
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Check if chapter-1 visualization exists and has content
      const chapter1Container = d3.select("#chapter-1");
      const hasVisualization =
        !chapter1Container.empty() &&
        chapter1Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-1 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-1")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-1",
          "external-internal-sort"
        );
      } else {
        // Just dispatch the event for this step
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "external-internal-sort" },
          })
        );
      }
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
  //   text: "Books about finding spiritual and religious meaning begin to rise in the wake of war. Why wouldn't they? Your neighbor may be a German spy or worse: a communist. Like Smiles' readers, these Americans, rightfully so, hope to find some semblance of control when your fate is oversees in the hands of 4.7 million young privates.",
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
    text: `This trend of responding to external forces continued until The Great Depression gave rise to entirely new sub-genres of self-help — books that see stock markets crash and claim you "win friends and influence people" or use "the power of positive thinking" to take back control.`,
    fullwidth: true,
    render: () => {
      // Check if chapter-2 visualization exists and has content
      const chapter2Container = d3.select("#chapter-2");
      const hasVisualization =
        !chapter2Container.empty() &&
        chapter2Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-2 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-2")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-2",
          "post-20s"
        );
      } else {
        // Just update the existing visualization
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "post-20s" },
          })
        );
      }
    },
  },

  {
    id: "neoliberal-shift",
    text: `Eventually we get to the "Me Decade." Flower power blossomed and Watergate sowed doubt, Reagan Era neoliberalism was on the rise. "YOU can take care of yourself" became the common sentiment. Suddenly, book shelves saw fewer guides to changing the world, and more manuals for changing yourself.`,
    fullwidth: true,
    render: () => {
      // Check if chapter-2 visualization exists and has content
      const chapter2Container = d3.select("#chapter-2");
      const hasVisualization =
        !chapter2Container.empty() &&
        chapter2Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-2 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-2")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-2",
          "neoliberal-shift"
        );
      } else {
        // Just update the existing visualization
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "neoliberal-shift" },
          })
        );
      }
    },
  },

  {
    id: "all-years",
    text: `The gap finally closes as we enter the 21st century. Self-help pivots toward coping and finding resilience within yourself. Many authors push "personal hustle" as a response to economic insecurity, or "leaning in" first, addressing sexism second.`,
    fullwidth: true,
    fadeOut: true,
    render: () => {
      // Check if chapter-2 visualization exists and has content
      const chapter2Container = d3.select("#chapter-2");
      const hasVisualization =
        !chapter2Container.empty() &&
        chapter2Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-2 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-2")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-2",
          "all-years"
        );
      } else {
        // Just update the existing visualization
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "all-years" },
          })
        );
      }
    },
  },
  {
    id: "chapter-3",
    text: "Context matters. History impacts feelings of helplessness. But who's preying on those feelings?",
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
      // Check if chapter-3 visualization exists and has content
      const chapter3Container = d3.select("#chapter-3");
      const hasVisualization =
        !chapter3Container.empty() &&
        chapter3Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-3 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-3")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-3",
          "authors-2"
        );
      } else {
        // Maintain the credibility-score state
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "authors-2" },
          })
        );
      }
    },
  },

  {
    id: "credibility-score",
    text: `Then there are those who I've heard referred to as "drug dealers." This may seem excessive, but when you see titles like "You Are a Badass" and "Turn Your Weight Loss Vision Into Reality!," tell me you don't want a taste.`,
    fullwidth: true,
    render: () => {
      // Check if chapter-3 visualization exists and has content
      const chapter3Container = d3.select("#chapter-3");
      const hasVisualization =
        !chapter3Container.empty() &&
        chapter3Container.select("svg").size() > 0;

      if (!hasVisualization) {
        console.log(
          "Chapter-3 visualization not found or empty, using VisualizationManager..."
        );

        // Clear and recreate the container
        const figure = d3.select("#figure-container");
        figure.html("");

        const vizContainer = figure
          .append("div")
          .attr("id", "chapter-3")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-3",
          "authors-3"
        );
      } else {
        // Maintain the credibility-score state
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "authors-3" },
          })
        );
      }
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
      // Check if chapter-3-3d visualization exists and has content
      let vizContainer = d3.select("#chapter-3-3d");
      const hasVisualization =
        !vizContainer.empty() &&
        (vizContainer.select("canvas").size() > 0 ||
          vizContainer.select("#plotly-div").size() > 0);

      if (!hasVisualization) {
        console.log(
          "Chapter-3-3d visualization not found or empty, using VisualizationManager..."
        );

        const figure = d3.select("#figure-container");
        figure.html("");

        vizContainer = figure
          .append("div")
          .attr("id", "chapter-3-3d")
          .style("width", "100%")
          .style("height", "100%");

        // Use VisualizationManager to reload the visualization
        window.VisualizationManager.ensureVisualizationInitialized(
          "chapter-3-3d",
          "low-credibility"
        );

        // No longer track with window.chapter3_3d_loaded
      } else {
        // Simply update the visualization state
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: "low-credibility" },
          })
        );
      }
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

(function () {
  ///////////////////////////////////////////////////////////// ! Setup and Configuration
  // Adjust chapter-3-3d div to fill the viewport
  const chapter3_3dDiv = document.getElementById("chapter-3-3d");
  chapter3_3dDiv.style.width = "100vw";
  chapter3_3dDiv.style.height = "100vh";
  chapter3_3dDiv.style.margin = "0";
  chapter3_3dDiv.style.padding = "0";
  chapter3_3dDiv.style.border = "none";
  chapter3_3dDiv.style.position = "relative";

  // Store all author data
  let allAuthorData = [];

  ///////////////////////////////////////////////////////////// ! Data Filtering Functions
  // Function to filter data based on step
  function filterDataForStep(stepId) {
    if (!allAuthorData || allAuthorData.length === 0) return [];

    switch (stepId) {
      case "earned-credibility":
        return allAuthorData.map((d) => {
          d.highlighted =
            d.author_clean === "Elisabeth Kübler-Ross" ||
            d.author_clean === "Gabor Maté";
          return d;
        });
      case "low-credibility":
        return allAuthorData.map((d) => {
          d.highlighted =
            d.author_clean === "L. Ron Hubbard" ||
            d.author_clean === "Kevin Trudeau" ||
            d.author_clean === "P.T. Barnum";
          return d;
        });

      default:
        return allAuthorData;
    }
  }

  ///////////////////////////////////////////////////////////// ! Visualization Functions
  // Function to display author data in 3D
  function displayAuthorData3D(data, stepId) {
    if (data && data.length > 0) {
      ///////////////////////////////////////////////////////////// ! Data Processing
      // Parse numeric data
      data.forEach((d) => {
        d.avg_star_rating = +d.avg_star_rating;
        d.author_num_books = Math.max(1, +d.author_num_books); // Ensure minimum value of 1
        d.avg_cred_score = +d.avg_cred_score;
        d.bt_count = +d.bt_count;
      });

      // Calculate opacity based on avg_star_rating (Y axis)
      const minRating = d3.min(data, (d) => d.avg_star_rating);
      const maxRating = d3.max(data, (d) => d.avg_star_rating);
      const opacityScale = d3
        .scaleLinear()
        .domain([minRating, maxRating])
        .range([0.3, 1]);

      ///////////////////////////////////////////////////////////// ! Plot Configuration
      // Prepare data for Plotly
      const plotData = [
        {
          x: data.map((d) => d.author_num_books),
          y: data.map((d) => d.avg_star_rating),
          z: data.map((d) => d.avg_cred_score),
          mode: "markers",
          type: "scatter3d",
          text: data.map((d) => d.author_clean),
          hovertemplate:
            "<b>%{text}</b><br>" +
            "Books: %{x}<br>" +
            "Rating: %{y}<br>" +
            "Cred Score: %{z}<br>",
          marker: {
            size: data.map((d) => (d.highlighted ? 25 : 8)),
            color: data.map((d) => {
              if (d.author_clean === "Gabor Maté") {
                return "url(assets/authors/gabor-mate.jpeg)";
              }
              return d.highlighted ? "var(--color-yellow)" : "#e1d6c2";
            }),
            opacity: data.map((d) => opacityScale(d.avg_star_rating)),
            line: {
              color: data.map((d) => {
                if (d.highlighted) return "black";
                return d.bt_count > 0 ? "var(--color-teal)" : "rgba(0,0,0,0)";
              }),
              width: data.map((d) => (d.highlighted ? 2 : 1)),
            },
          },
        },
      ];

      const layout = {
        autosize: true,
        height: chapter3_3dDiv.clientHeight,
        width: chapter3_3dDiv.clientWidth,
        paper_bgcolor: "#f2efe9", // Set background color
        plot_bgcolor: "#f2efe9",
        scene: {
          xaxis: {
            title: "Number of Books",
            type: "log",
            titlefont: { family: "Andale Mono", size: 15, color: "#000" },
            tickfont: { family: "Andale Mono", size: 15, color: "#000" },
          },
          yaxis: {
            title: "Avg Star Rating",
            titlefont: { family: "Andale Mono", size: 15, color: "#000" },
            tickfont: { family: "Andale Mono", size: 15, color: "#000" },
          },
          zaxis: {
            title: "Avg Cred Score",
            titlefont: { family: "Andale Mono", size: 15, color: "#000" },
            tickfont: { family: "Andale Mono", size: 15, color: "#000" },
          },
          bgcolor: "#f2efe9",
        },
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
        },
      };

      ///////////////////////////////////////////////////////////// ! Camera Positioning
      // Set specific camera position for steps
      // Use the same camera position for all steps
      layout.scene.camera = {
        center: {
          x: 0.3487183886806972,
          y: 0.2648659619748207,
          z: -0.133097816787365,
        },
        eye: {
          x: -1.2115474570501374,
          y: 1.8512747823703717,
          z: 1.3530130180083257,
        },
        up: {
          x: 0.338273785959222,
          y: -0.444374857260449,
          z: 0.8295190365311517,
        },
      };

      ///////////////////////////////////////////////////////////// ! Responsive Behavior
      // Add window resize event handler for responsive behavior
      window.addEventListener("resize", function () {
        Plotly.relayout("chapter-3-3d", {
          width: chapter3_3dDiv.clientWidth,
          height: chapter3_3dDiv.clientHeight,
        });
      });

      // Reference the graph div
      const graphDiv = document.getElementById("chapter-3-3d");

      // If already plotted, only update the marker styling
      if (graphDiv && graphDiv._fullLayout && graphDiv._fullLayout.scene) {
        Plotly.restyle("chapter-3-3d", {
          "marker.size": [data.map((d) => (d.highlighted ? 25 : 8))],
          "marker.color": [
            data.map((d) => {
              if (d.author_clean === "Gabor Maté") {
                return "url(assets/authors/gabor-mate.jpeg)";
              }
              return d.highlighted ? "var(--color-yellow)" : "#e1d6c2";
            }),
          ],
          "marker.opacity": [data.map((d) => opacityScale(d.avg_star_rating))],
          "marker.line.color": [
            data.map((d) => {
              if (d.highlighted) return "black";
              return d.bt_count > 0 ? "var(--color-teal)" : "rgba(0,0,0,0)";
            }),
          ],
          "marker.line.width": [data.map((d) => (d.highlighted ? 2 : 1))],
        });
      } else {
        // Initial plot creation
        Plotly.newPlot("chapter-3-3d", plotData, layout);
      }

      // Add event listener to log camera position when the view changes
      document
        .getElementById("chapter-3-3d")
        .on("plotly_relayout", function (eventData) {
          // Check if the event contains camera information
          if (eventData && eventData["scene.camera"]) {
            console.log("Camera position:", eventData["scene.camera"]);
          }
        });
    }
  }

  ///////////////////////////////////////////////////////////// ! Event Listeners
  // Add event listener for visualization updates
  document.addEventListener("visualizationUpdate", (event) => {
    const stepId = event.detail.step;
    displayAuthorData3D(filterDataForStep(stepId), stepId);
  });

  // Function to get current camera position
  window.getCameraPosition = function () {
    const graphDiv = document.getElementById("chapter-3-3d");
    if (graphDiv && graphDiv._fullLayout && graphDiv._fullLayout.scene) {
      const camera = graphDiv._fullLayout.scene._scene.camera;
      return {
        eye: camera.eye,
        center: camera.center,
        up: camera.up,
      };
    }
    return null;
  };

  ///////////////////////////////////////////////////////////// ! Initialization
  try {
    // First check if data is already preloaded in dataCache
    if (window.dataCache && window.dataCache.authorData) {
      console.log("Using preloaded author data for 3D visualization");
      allAuthorData = window.dataCache.authorData;
      // Set credibility score for specific authors and filter out zero credibility
      allAuthorData = allAuthorData
        .map((author) => {
          if (
            author.author_clean === "P.T. Barnum" ||
            author.author_clean === "Kevin Trudeau"
          ) {
            author.avg_cred_score = "1";
          }
          return author;
        })
        .filter((author) => +author.avg_cred_score > 0);
      displayAuthorData3D(filterDataForStep("the-secret"), "the-secret"); // Default to the-secret step
    } else {
      // Try loading data directly if not preloaded
      d3.csv("data/sh_0415_author/author.csv")
        .then((data) => {
          // Set credibility score for specific authors and filter out zero credibility
          allAuthorData = data
            .map((author) => {
              if (
                author.author_clean === "P.T. Barnum" ||
                author.author_clean === "Kevin Trudeau"
              ) {
                author.avg_cred_score = "1";
              }
              return author;
            })
            .filter((author) => +author.avg_cred_score > 0);
          displayAuthorData3D(filterDataForStep("the-secret"), "the-secret");
        })
        .catch(() => {
          // Rest of your existing fetch fallback code
          fetch("data/sh_0415_author/author.csv")
            .then((response) => response.text())
            .then((csvText) => {
              const rows = csvText.split("\n");
              const headers = rows[0].split(",");
              const parsedData = rows.slice(1).map((row) => {
                const values = row.split(",");
                const obj = {};
                headers.forEach((header, i) => {
                  obj[header] = values[i];
                });
                return obj;
              });
              // Set credibility score for specific authors and filter out zero credibility
              allAuthorData = parsedData
                .map((author) => {
                  if (
                    author.author_clean === "P.T. Barnum" ||
                    author.author_clean === "Kevin Trudeau"
                  ) {
                    author.avg_cred_score = "1";
                  }
                  return author;
                })
                .filter((author) => +author.avg_cred_score > 0);
              displayAuthorData3D(
                filterDataForStep("the-secret"),
                "the-secret"
              );
            })
            .catch(useHardcodedData);
        });
    }
  } catch (error) {
    useHardcodedData();
  }
})();

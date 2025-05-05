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
          showlegend: false,
          text: data.map((d) => d.author_clean),
          hovertemplate:
            "<b>%{text}</b><br>" +
            "Books: %{x}<br>" +
            "Rating: %{y}<br>" +
            "Cred Score: %{z}<br>" +
            "<extra></extra>",
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
        showlegend: false,
        paper_bgcolor: "#f2efe9",
        plot_bgcolor: "#f2efe9",
        scene: {
          xaxis: {
            title: {
              text: "Number of Books",
              font: {
                family: "Andale Mono",
                size: 12,
                color: "rgba(0, 0, 0, 0.5)",
              },
            },
            type: "log",
            tickfont: {
              family: "Andale Mono",
              size: 12,
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          yaxis: {
            title: {
              text: "Avg Star Rating",
              font: {
                family: "Andale Mono",
                size: 12,
                color: "rgba(0, 0, 0, 0.5)",
              },
            },
            tickfont: {
              family: "Andale Mono",
              size: 12,
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
          zaxis: {
            title: {
              text: "Avg Cred Score",
              font: {
                family: "Andale Mono",
                size: 12,
                color: "rgba(0, 0, 0, 0.5)",
              },
            },
            tickfont: {
              family: "Andale Mono",
              size: 12,
              color: "rgba(0, 0, 0, 0.5)",
            },
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
          x: 0.09281848656308971,
          y: -0.05135192301665359,
          z: -0.043104787934012755,
        },
        eye: {
          x: 1.276767997665493,
          y: 1.477562186328202,
          z: 1.5313871016951325,
        },
        up: {
          x: -0.001886770895421225,
          y: 0.002537092842318987,
          z: 0.9999959016081094,
        },
        projection: {
          type: "perspective",
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

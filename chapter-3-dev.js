// Chapter 3 - Author Visualization
(function () {
  ///////////////////////////////////////////////////////////// ! Setup and Configuration
  // Adjust chapter-3 div to fill the viewport
  const chapter3Div = document.getElementById("chapter-3");
  chapter3Div.style.width = "100vw";
  chapter3Div.style.height = "100vh";
  chapter3Div.style.margin = "0";
  chapter3Div.style.padding = "0";
  chapter3Div.style.border = "none";
  chapter3Div.style.overflow = "hidden";
  chapter3Div.style.position = "relative";

  // Featured authors configuration
  const featuredAuthors = {
    "Deepak Chopra": "assets/authors/deepak-chopra.jpg",
    "Jen Sincero": "assets/authors/jen-sincero.jpg",
    "Michelle Obama": "assets/authors/michelle-obama.jpg",
    "Gabor Maté": "assets/authors/gabor-mate.jpeg",
    "Rhonda Byrne": "assets/authors/rhonda-byrne.jpg",
  };

  // Get the actual dimensions of the container
  const fullWidth = chapter3Div.clientWidth;
  const fullHeight = chapter3Div.clientHeight;

  // Set up dimensions and margins for the chart
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const width = fullWidth - margin.left - margin.right;
  const height = fullHeight - margin.top - margin.bottom;

  let allAuthorData; // Store the data globally
  let svg; // Store the SVG globally
  let currentStepId = "all-authors"; // Track current step

  ///////////////////////////////////////////////////////////// ! Data Filtering Functions
  // Function to filter data based on step ID
  function filterDataForStep(stepId) {
    if (!allAuthorData) return [];

    // For authors-2 step, we'll mark Deepak Chopra for animation
    if (stepId === "authors-2") {
      allAuthorData.forEach((d) => {
        d.shouldAnimate = d.author_clean === "Deepak Chopra";
      });
    } else {
      allAuthorData.forEach((d) => {
        d.shouldAnimate = false;
      });
    }

    return allAuthorData;
  }

  ///////////////////////////////////////////////////////////// ! Visualization Functions
  // Function to display author data
  function displayAuthorData(data, stepId) {
    if (!data || data.length === 0) return;

    // Clear existing SVG content first
    svg.selectAll("*").remove();

    ///////////////////////////////////////////////////////////// ! Data Processing
    // Parse numeric data
    data.forEach((d) => {
      d.avg_star_rating = +d.avg_star_rating;
      d.author_num_books = Math.max(1, +d.author_num_books); // Ensure minimum value of 1
      d.avg_cred_score = +d.avg_cred_score;
      d.bt_count = +d.bt_count;

      // Mark featured authors
      d.isFeatured = featuredAuthors.hasOwnProperty(d.author_clean);
    });

    // Uniform circle size
    const circleRadius = 5;
    const featuredRadius = 30; // Larger radius for featured authors

    ///////////////////////////////////////////////////////////// ! Scales Creation
    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.avg_star_rating),
        d3.max(data, (d) => d.avg_star_rating),
      ])
      .nice()
      .range([0, width]);

    const yScale = d3
      .scaleLog()
      .domain([
        1, // Keeping minimum at 1 for log scale
        d3.max(data, (d) => d.author_num_books),
      ])
      .nice()
      .range([height, 0]);

    ///////////////////////////////////////////////////////////// ! Axes Creation
    // Add X axis
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("class", "annotation");

    // Add X axis label
    svg
      .append("text")
      .attr("class", "annotation")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 50)
      .style("text-anchor", "middle")
      .text("Average Star Rating");

    // Add Y axis
    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("class", "annotation");

    // Add Y axis label
    svg
      .append("text")
      .attr("class", "annotation")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 50)
      .style("text-anchor", "middle")
      .text("Number of Books");

    ///////////////////////////////////////////////////////////// ! Tooltip Creation
    // Add tooltip
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    ///////////////////////////////////////////////////////////// ! Data Points Creation
    // Create patterns for featured authors
    const defs = svg.append("defs");

    // Create patterns for each featured author
    Object.entries(featuredAuthors).forEach(([author, imgUrl]) => {
      const patternId = `pattern-${author.toLowerCase().replace(/\s+/g, "-")}`;

      const pattern = defs
        .append("pattern")
        .attr("id", patternId)
        .attr("width", 1)
        .attr("height", 1)
        .attr("patternUnits", "objectBoundingBox")
        .attr("patternContentUnits", "objectBoundingBox");

      pattern
        .append("image")
        .attr("width", 1)
        .attr("height", 1)
        .attr("x", 0)
        .attr("y", 0)
        .attr("preserveAspectRatio", "xMidYMid slice")
        .attr("xlink:href", imgUrl);
    });

    // Split data into regular and featured authors
    const regularData = data.filter((d) => !d.isFeatured);
    const featuredData = data.filter((d) => d.isFeatured);

    // Create groups for regular authors first
    const regularPoints = svg
      .selectAll(".regular-point")
      .data(regularData)
      .enter()
      .append("g")
      .attr("class", "data-point")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.avg_star_rating)},${yScale(
            d.author_num_books
          )})`
      );

    // Add circles for regular authors
    regularPoints
      .append("circle")
      .attr("r", circleRadius)
      .style("fill", "var(--color-base-darker)")
      .style("opacity", 0.9)
      .style("stroke", "black")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 1);

    // Create groups for featured authors (will be drawn last/on top)
    const featuredPoints = svg
      .selectAll(".featured-point")
      .data(featuredData)
      .enter()
      .append("g")
      .attr("class", "data-point")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.avg_star_rating)},${yScale(
            d.author_num_books
          )})`
      );

    // Add featured authors' circles with animation
    featuredPoints
      .append("circle")
      .attr("r", featuredRadius)
      .style(
        "fill",
        (d) =>
          `url(#pattern-${d.author_clean.toLowerCase().replace(/\s+/g, "-")})`
      )
      .style("opacity", 0.9)
      .style("stroke", "black")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 1)
      .transition() // Add transition
      .duration(1000) // 1 second duration
      .attr("r", (d) =>
        d.shouldAnimate ? featuredRadius * 1.5 : featuredRadius
      ); // Scale up if shouldAnimate is true

    // Add mouseover and mouseout events to all points
    const allPoints = svg.selectAll(".data-point");
    allPoints.on("mouseover", function (event, d) {
      tooltip
        .html(
          `<strong>${d.author_clean}</strong><br/>
           Books: ${d.author_num_books}<br/>
           Rating: ${d.avg_star_rating.toFixed(2)}`
        )
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 28 + "px")
        .style("opacity", 0.9);
    });

    allPoints.on("mouseout", function () {
      tooltip.style("opacity", 0);
    });

    // Update current step
    currentStepId = stepId;
  }

  ///////////////////////////////////////////////////////////// ! Initialization
  try {
    // Create SVG container
    svg = d3
      .select("#chapter-3")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("display", "block")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Check if data is already preloaded in dataCache
    if (window.dataCache && window.dataCache.authorData) {
      allAuthorData = window.dataCache.authorData.filter(
        (author) => author.author_num_books > 0
      );

      // Update Matthew McConaughey's and Michelle Obama's book counts
      allAuthorData.forEach((author) => {
        if (author.author_clean === "Matthew McConaughey") {
          author.author_num_books = 15;
        }
        if (author.author_clean === "Michelle Obama") {
          author.author_num_books = 60;
        }
      });

      // Get initial step from URL if available
      const urlParams = new URLSearchParams(window.location.search);
      const currentStep = urlParams.get("step") || "all-authors";

      displayAuthorData(filterDataForStep(currentStep), currentStep);
    } else {
      // Try loading data directly if not preloaded
      d3.csv("data/sh_0415_author/author.csv")
        .then((data) => {
          // Filter out authors with zero books
          allAuthorData = data.filter((author) => author.author_num_books > 0);

          // Update Matthew McConaughey's and Michelle Obama's book counts
          allAuthorData.forEach((author) => {
            if (author.author_clean === "Matthew McConaughey") {
              author.author_num_books = 15;
            }
            if (author.author_clean === "Michelle Obama") {
              author.author_num_books = 60;
            }
          });

          // Get initial step from URL if available
          const urlParams = new URLSearchParams(window.location.search);
          const currentStep = urlParams.get("step") || "all-authors";

          displayAuthorData(filterDataForStep(currentStep), currentStep);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    }
  } catch (error) {
    console.error("Error in initialization:", error);
  }

  ///////////////////////////////////////////////////////////// ! Event Listeners
  // Add event listener for visualization updates
  document.addEventListener("visualizationUpdate", (event) => {
    const stepId = event.detail.step;
    displayAuthorData(filterDataForStep(stepId), stepId);
  });
})();

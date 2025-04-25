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
    "50 Cent": "assets/authors/50-cent.jpg",
    "Arnold Schwarzenegger": "assets/authors/arnold-schwarzenegger.jpg",
    "Cameron Diaz": "assets/authors/cameron-diaz.jpg",
    "Brené Brown": "assets/authors/brene-brown.jpg",
    "Demi Lovato": "assets/authors/demi-lovato.jpg",
    "Donald J. Trump": "assets/authors/donald-j-trump.jpg",
    "Eckhart Tolle": "assets/authors/eckhart-tolle.jpg",
    "Esther Hicks": "assets/authors/esther-hicks.jpg",
    "Gabrielle Bernstein": "assets/authors/gabrielle-bernstein.jpg",
    "Gary Vaynerchuk": "assets/authors/gary-vaynerchuk.jpg",
    "Gwyneth Paltrow": "assets/authors/gwyneth-paltrow.jpg",
    "Jay Shetty": "assets/authors/jay-shetty.jpg",
    "Jordan B. Peterson": "assets/authors/jordan-b-peterson.jpg",
    "Jillian Michaels": "assets/authors/jillian-michaels.jpg",
    "Marie Kondo": "assets/authors/marie-kondo.jpg",
    "Mark Manson": "assets/authors/mark-manson.jpg",
    "Matthew McConaughey": "assets/authors/matthew-mcconaughey.jpg",
    "Mel Robbins": "assets/authors/mel-robbins.jpg",
    "Oprah Winfrey": "assets/authors/oprah-winfrey.jpg",
    "Rachel Hollis": "assets/authors/rachel-hollis.jpg",
    "Russell Brand": "assets/authors/russell-brand.jpg",
    "Phillip C. McGraw": "assets/authors/phillip-c-mcgraw.jpg",
    "Stephen King": "assets/authors/stephen-king.jpg",
    "Tim Ferriss": "assets/authors/tim-ferriss.jpg",
    "Tony Robbins": "assets/authors/tony-robbins.jpg",
    "Rich Roll": "assets/authors/rich-roll.jpg",
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

    // For authors-1 step, animate specific authors
    if (stepId === "authors-1") {
      allAuthorData.forEach((d) => {
        d.shouldAnimate =
          // d.author_clean === "Deepak Chopra" ||
          d.author_clean === "Matthew McConaughey" ||
          d.author_clean === "Jay Shetty" ||
          d.author_clean === "Rainn Wilson" ||
          d.author_clean === "Demi Lovato" ||
          d.author_clean === "Jillian Michaels" ||
          d.author_clean === "50 Cent" ||
          d.author_clean === "Michelle Obama";
      });
    } else if (stepId === "authors-2") {
      // For authors-2 step, animate different set of authors
      allAuthorData.forEach((d) => {
        d.shouldAnimate =
          d.author_clean === "Esther Hicks" ||
          d.author_clean === "James Clear" ||
          d.author_clean === "Brené Brown" ||
          d.author_clean === "Michelle Obama" ||
          // d.author_clean === "Arnold Schwarzenegger" ||
          d.author_clean === "Oprah Winfrey" ||
          d.author_clean === "Matthew McConaughey";
      });
    } else if (stepId === "authors-3") {
      // For authors-3 step, animate another set of authors
      allAuthorData.forEach((d) => {
        d.shouldAnimate =
          // d.author_clean === "Deepak Chopra" ||
          d.author_clean === "Jen Sincero" ||
          d.author_clean === "Donald J. Trump" ||
          d.author_clean === "Phillip C. McGraw";
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

    // Instead of clearing everything, only clear axes and labels
    svg.selectAll(".x-axis, .y-axis, .annotation").remove();

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
    const featuredRadius = 20; // Larger radius for featured authors

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
        70, // Minimum value for log scale
        4000, // Fixed maximum value
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

    // Split data into categories based on current state and animation
    const regularData = data.filter((d) => !d.isFeatured);

    // Featured authors that were previously animated but aren't in current step
    const previouslyAnimatedData = data.filter((d) => {
      if (!d.isFeatured || d.shouldAnimate) return false;

      const author = d.author_clean;

      // Authors from step 1 that should be featured in step 2 and 3
      const step1Authors = [
        "Matthew McConaughey",
        "Jay Shetty",
        "Rainn Wilson",
        "Demi Lovato",
        "Jillian Michaels",
        "50 Cent",
        "Michelle Obama",
      ];

      // Authors from step 2 that should be featured in step 3
      const step2Authors = [
        "Esther Hicks",
        "James Clear",
        "Brené Brown",
        "Michelle Obama",
        "Oprah Winfrey",
        "Matthew McConaughey",
      ];

      if (stepId === "authors-2") {
        return step1Authors.includes(author);
      } else if (stepId === "authors-3") {
        return step1Authors.includes(author) || step2Authors.includes(author);
      }

      return false;
    });

    // Currently animated featured authors
    const animatedData = data.filter((d) => d.isFeatured && d.shouldAnimate);

    // Featured authors that haven't been animated yet
    const upcomingFeaturedData = data.filter(
      (d) =>
        d.isFeatured && !d.shouldAnimate && !previouslyAnimatedData.includes(d)
    );

    // First render regular points and upcoming featured points (as regular style)
    const regularPoints = svg
      .selectAll(".regular-point")
      .data([...regularData, ...upcomingFeaturedData], (d) => d.author_clean);

    // Remove old points
    regularPoints.exit().remove();

    // Add new points
    const regularPointsEnter = regularPoints
      .enter()
      .append("g")
      .attr("class", "regular-point data-point");

    regularPointsEnter
      .append("circle")
      .attr("r", circleRadius)
      .style("fill", "var(--color-base-darker)") // All regular points start gray
      .style("opacity", 0.9)
      .style("stroke", "black")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 1);

    // Update all regular points
    regularPoints
      .merge(regularPointsEnter)
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.avg_star_rating)},${yScale(
            d.author_num_books
          )})`
      );

    // Then render previously animated featured points
    const previouslyFeaturedPoints = svg
      .selectAll(".featured-point:not(.animated)")
      .data(previouslyAnimatedData, (d) => d.author_clean);

    // Remove old featured points
    previouslyFeaturedPoints.exit().remove();

    // Add new featured points
    const previouslyFeaturedPointsEnter = previouslyFeaturedPoints
      .enter()
      .append("g")
      .attr("class", "featured-point data-point");

    previouslyFeaturedPointsEnter
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
      .style("stroke-width", 1);

    // Update all previously featured points
    const allPreviouslyFeaturedPoints = previouslyFeaturedPoints.merge(
      previouslyFeaturedPointsEnter
    );

    allPreviouslyFeaturedPoints.attr(
      "transform",
      (d) =>
        `translate(${xScale(d.avg_star_rating)},${yScale(d.author_num_books)})`
    );

    // Finally render currently animated featured points
    const animatedPoints = svg
      .selectAll(".featured-point.animated")
      .data(animatedData, (d) => d.author_clean);

    // Remove old animated points
    animatedPoints.exit().remove();

    // Add new animated points
    const animatedPointsEnter = animatedPoints
      .enter()
      .append("g")
      .attr("class", "featured-point animated data-point");

    animatedPointsEnter
      .append("circle")
      .attr("r", circleRadius) // Start at regular size
      .style("fill", "var(--color-base-darker)") // Start with regular style
      .style("opacity", 0.9)
      .style("stroke", "black")
      .style("stroke-opacity", 0.3)
      .style("stroke-width", 1);

    // Update all animated points with transitions
    const allAnimatedPoints = animatedPoints.merge(animatedPointsEnter);

    allAnimatedPoints.attr(
      "transform",
      (d) =>
        `translate(${xScale(d.avg_star_rating)},${yScale(d.author_num_books)})`
    );

    // Animate to large size and change to image
    allAnimatedPoints
      .select("circle")
      .transition()
      .duration(1000)
      .attr("r", featuredRadius * 3)
      .style(
        "fill",
        (d) =>
          `url(#pattern-${d.author_clean.toLowerCase().replace(/\s+/g, "-")})`
      );

    // Add mouseover and mouseout events to all points
    const allPoints = svg.selectAll(".data-point");
    allPoints.on("mouseover", function (event, d) {
      tooltip
        .html(
          `<strong>${d.author_clean}</strong><br/>
           Books: ${d.author_num_books}<br/>
           Rating: ${d.avg_star_rating.toFixed(2)}<br/>
           Avg # Ratings: ${d.avg_num_ratings}`
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

    // Load author data once
    d3.csv("data/sh_0415_author/author.csv", d3.autoType)
      .then((data) => {
        // Filter and store
        allAuthorData = data.filter(
          (author) =>
            author.author_num_books > 10 && author.avg_num_ratings >= 3000
        );

        // Manual overrides
        allAuthorData.forEach((author) => {
          if (author.author_clean === "Matthew McConaughey") {
            author.author_num_books = 15;
          }
          if (author.author_clean === "Michelle Obama") {
            author.author_num_books = 60;
          }
        });

        // Initial render
        const urlParams = new URLSearchParams(window.location.search);
        const initialStep = urlParams.get("step") || "all-authors";
        displayAuthorData(filterDataForStep(initialStep), initialStep);
      })
      .catch((error) => {
        console.error("Error loading author data:", error);
      });
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

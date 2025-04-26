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

  // Add pulsating animation style
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    @keyframes pulsate {
      0% {
        stroke-width: 10;
        opacity: 0.3;
      }
      
      70% {
        stroke-width: 12;
        opacity: 1;
      }
      
      100% {
        stroke-width: 10;
        opacity: 0.3;
      }
    }
    
    .pulsate-stroke {
      animation: pulsate 2s infinite;
    }
  `;
  document.head.appendChild(styleElement);

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
    // "Stephen King": "assets/authors/stephen-king.jpg",
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
          d.author_clean === "Phillip C. McGraw" ||
          d.author_clean === "Deepak Chopra";
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
    svg.selectAll(".regular-point, .featured-point").remove(); // Remove old points for force layout

    ///////////////////////////////////////////////////////////// ! Data Processing
    data.forEach((d) => {
      d.avg_star_rating = +d.avg_star_rating;
      d.author_num_books = Math.max(1, +d.author_num_books);
      d.avg_cred_score = +d.avg_cred_score;
      d.bt_count = +d.bt_count;
      d.isFeatured = featuredAuthors.hasOwnProperty(d.author_clean);
    });

    const minBooks = d3.min(data, (d) => d.author_num_books);
    const maxBooks = d3.max(data, (d) => d.author_num_books);
    const sizeScale = d3
      .scaleSqrt()
      .domain([minBooks, maxBooks])
      .range([8, 40]);

    const xScale = d3
      .scaleLinear()
      .domain([3.2, d3.max(data, (d) => d.avg_star_rating)])
      .nice()
      .range([0, width]);
    const yCenter = height / 2;

    ///////////////////////////////////////////////////////////// ! Axes Creation
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${yCenter + 60})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("class", "annotation");
    svg
      .append("text")
      .attr("class", "annotation")
      .attr("x", width / 2)
      .attr("y", yCenter + 100)
      .style("text-anchor", "middle")
      .text("Average Star Rating");

    ///////////////////////////////////////////////////////////// ! Tooltip Creation
    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    ///////////////////////////////////////////////////////////// ! Data Points Creation
    const defs = svg.append("defs");
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

    // Helper for highlight color
    function getHighlightColor(d) {
      return d.shouldAnimate ? "red" : null;
    }

    // Prepare nodes for force simulation
    const nodes = data.map((d) => Object.assign({}, d));

    // Create groups for each node
    const nodeGroups = svg
      .selectAll(".data-point")
      .data(nodes, (d) => d.author_clean)
      .enter()
      .append("g")
      .attr("class", (d) => {
        if (d.isFeatured && d.shouldAnimate)
          return "featured-point animated data-point";
        if (d.isFeatured) return "featured-point data-point";
        return "regular-point data-point";
      });

    // Add stroke circle for animated authors
    nodeGroups
      .filter((d) => d.shouldAnimate)
      .append("circle")
      .attr("r", (d) => sizeScale(d.author_num_books))
      .style("fill", "none")
      .style("stroke", "var(--color-yellow)")
      .style("stroke-opacity", 0.9)
      .style("stroke-width", 3)
      .attr("class", "pulsate-stroke");

    // Add main circle with image or solid fill
    nodeGroups
      .append("circle")
      .attr("r", (d) => sizeScale(d.author_num_books))
      .style("fill", (d) =>
        d.isFeatured
          ? `url(#pattern-${d.author_clean.toLowerCase().replace(/\s+/g, "-")})`
          : "var(--color-base-darker)"
      )
      .style("opacity", 0.9)
      .style("stroke", "black")
      .style("stroke-opacity", 0.9)
      .style("stroke-width", 1);

    // Add mouseover and mouseout events
    nodeGroups.on("mouseover", function (event, d) {
      // Move this element to the front by appending it to the end of its parent
      this.parentNode.appendChild(this);

      // Only scale up if this is a featured author
      if (d.isFeatured) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", function (d) {
            return `translate(${d.x},${d.y}) scale(5)`;
          });
      }

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
    nodeGroups.on("mouseout", function (event, d) {
      // Only scale back down if this is a featured author
      if (d.isFeatured) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", function (d) {
            return `translate(${d.x},${d.y}) scale(1)`;
          });
      }

      tooltip.style("opacity", 0);
    });

    // D3 force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force("x", d3.forceX((d) => xScale(d.avg_star_rating)).strength(1))
      .force("y", d3.forceY(yCenter).strength(0.08))
      .force(
        "collide",
        d3.forceCollide((d) => sizeScale(d.author_num_books) + 2)
      )
      .stop();

    // Run the simulation for a fixed number of ticks for static layout
    for (let i = 0; i < 300; ++i) simulation.tick();

    // Position nodes
    nodeGroups.attr("transform", (d) => `translate(${d.x},${d.y})`);

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
            featuredAuthors.hasOwnProperty(author.author_clean) ||
            (author.author_num_books > 20 && author.avg_num_ratings >= 5000)
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

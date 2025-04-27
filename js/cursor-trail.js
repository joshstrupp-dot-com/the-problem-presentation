// Cursor trail effect with book cover images
document.addEventListener("DOMContentLoaded", function () {
  // Book cover images to use in the trail
  const BOOK_COVERS = [
    "whydoeshe.jpg",
    "smiles.jpg",
    "souldetox.jpg",
    "shutup.jpg",
    "fear.jpg",
  ];

  // Shuffle the book covers array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the book covers
  let shuffledCovers = shuffleArray([...BOOK_COVERS]);

  // How many cursors to create - now only 5
  const CURSORS_COUNT = 5;
  // The delay to update each cursor - increased for slower movement
  const CURSOR_DELAY_MS = 32;
  // Offset for the cursor position
  const IMAGE_OFFSET = [-20, -20];
  // Size of the book cover images
  const COVER_WIDTH = 80; // Narrower width
  const COVER_HEIGHT = 120; // Taller height

  // Create a container for the cursor trail
  const cursorParent = document.createElement("div");
  cursorParent.classList.add("cursor-parent");
  document.body.appendChild(cursorParent);

  // List of cursors
  let cursors = [];

  // Store current cursor positions
  let currentPositions = [];

  // Flag to track if cursor is in hero section
  let isInHeroSection = false;

  // Function to create cursors
  function createCursors(positions = null) {
    // Clear existing cursors
    cursorParent.innerHTML = "";
    cursors = [];

    // Create new cursors
    for (let i = 0; i < CURSORS_COUNT; i++) {
      // Create a div for each cursor
      let div = document.createElement("div");
      div.classList.add("fake-cursor");

      // Set the background image to one of the shuffled book covers
      div.style.backgroundImage = `url('assets/${shuffledCovers[i]}')`;
      div.style.width = `${COVER_WIDTH}px`;
      div.style.height = `${COVER_HEIGHT}px`;

      // If positions are provided, set the initial position
      if (positions && positions[i]) {
        div.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
      }

      // Add it to the main div
      cursorParent.appendChild(div);
      // Add it to the list
      cursors.push(div);
    }
  }

  // Initial creation of cursors
  createCursors();

  // Function to shuffle cursors on click
  function shuffleCursors() {
    // Only shuffle if in hero section
    if (!isInHeroSection) return;

    // Store current positions before shuffling
    currentPositions = cursors.map((cursor) => {
      const transform = cursor.style.transform;
      const match = transform.match(/translate\(([^,]+)px,\s*([^)]+)px\)/);
      if (match) {
        return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
      }
      return { x: 0, y: 0 };
    });

    // Shuffle the covers again
    shuffledCovers = shuffleArray([...BOOK_COVERS]);

    // Recreate the cursors with new shuffled images at their current positions
    createCursors(currentPositions);

    // Add a visual feedback effect
    cursors.forEach((cursor) => {
      cursor.classList.add("shuffle-effect");
      setTimeout(() => {
        cursor.classList.remove("shuffle-effect");
      }, 500);
    });
  }

  // Add click event listener to shuffle cursors
  document.addEventListener("click", shuffleCursors);

  // Function to check if cursor is in hero section
  function checkIfInHeroSection(event) {
    const heroSection = document.getElementById("hero");
    const rect = heroSection.getBoundingClientRect();

    const isInHero =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    // If state changed, update visibility
    if (isInHero !== isInHeroSection) {
      isInHeroSection = isInHero;

      // Show/hide cursor trail based on whether we're in hero section
      if (isInHeroSection) {
        cursorParent.style.display = "block";
        document.body.style.cursor = "none";
      } else {
        cursorParent.style.display = "none";
        document.body.style.cursor = "auto";
      }
    }
  }

  // Track mouse movement
  document.addEventListener(
    "mousemove",
    function (event) {
      // Check if cursor is in hero section
      checkIfInHeroSection(event);

      // Only update cursor positions if in hero section
      if (!isInHeroSection) return;

      // The position we want
      const x = event.clientX + IMAGE_OFFSET[0];
      const y = event.clientY + IMAGE_OFFSET[1];

      for (let i = 0; i < cursors.length; i++) {
        // For each cursor, update their position after every CURSOR_DELAY_MS per cursor
        const timeToWait = (i + 1) * CURSOR_DELAY_MS;
        setTimeout(() => {
          // Change its transform
          cursors[i].style.transform = `translate(${x}px, ${y}px)`;
        }, timeToWait);
      }
    },
    true
  );

  // Initial check for cursor position
  document.addEventListener(
    "mousemove",
    function (event) {
      checkIfInHeroSection(event);
    },
    { once: true }
  );
});

// Visualization Manager - handles proper initialization and reinitialization of visualizations
window.VisualizationManager = {
  // Track loaded scripts and their initialization functions
  visualizations: {
    "chapter-1": {
      scriptSrc: "chapter-1-dev.js",
      containerId: "chapter-1",
      initialized: false,
    },
    "chapter-2": {
      scriptSrc: "chapter-2-dev.js",
      containerId: "chapter-2",
      initialized: false,
    },
    "chapter-3": {
      scriptSrc: "chapter-3-dev.js",
      containerId: "chapter-3",
      initialized: false,
    },
    "chapter-3-3d": {
      scriptSrc: "chapter-3-3d.js",
      containerId: "chapter-3-3d",
      initialized: false,
    },
  },

  // Force reload a visualization script
  reloadVisualization: function (vizId) {
    console.log(`🔄 Reloading visualization: ${vizId}`);

    const viz = this.visualizations[vizId];
    if (!viz) {
      console.error(`Unknown visualization: ${vizId}`);
      return;
    }

    // Remove existing script tag
    const existingScript = document.querySelector(
      `script[src="${viz.scriptSrc}"]`
    );
    if (existingScript) {
      console.log(`  ✓ Removing existing script tag for ${viz.scriptSrc}`);
      existingScript.remove();
    }

    // Clear the container
    const container = document.getElementById(viz.containerId);
    if (container) {
      console.log(`  ✓ Clearing container: ${viz.containerId}`);
      container.innerHTML = "";
    }

    // Remove any event listeners that might have been added
    const oldElement = document.getElementById(viz.containerId);
    if (oldElement) {
      const newElement = oldElement.cloneNode(true);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }

    // Create a new script tag with a cache-busting parameter
    const script = document.createElement("script");
    script.src = `${viz.scriptSrc}?t=${Date.now()}`;
    script.onload = () => {
      console.log(`  ✓ Script reloaded: ${viz.scriptSrc}`);
      viz.initialized = true;
    };
    script.onerror = (error) => {
      console.error(`  ✗ Failed to load script: ${viz.scriptSrc}`, error);
    };

    // Append the new script
    document.body.appendChild(script);
  },

  // Check if a visualization needs initialization
  ensureVisualizationInitialized: function (vizId, stepName) {
    console.log(`📊 Ensuring ${vizId} is initialized for step: ${stepName}`);

    const container = document.getElementById(
      this.visualizations[vizId]?.containerId
    );

    // Check if container exists and has content
    if (
      !container ||
      container.innerHTML.trim() === "" ||
      !container.querySelector("svg")
    ) {
      console.log(`  ⚠️ ${vizId} needs initialization`);
      this.reloadVisualization(vizId);

      // After reload, dispatch the step event
      setTimeout(() => {
        console.log(
          `  📢 Dispatching visualizationUpdate for step: ${stepName}`
        );
        document.dispatchEvent(
          new CustomEvent("visualizationUpdate", {
            detail: { step: stepName },
          })
        );
      }, 1000); // Give the script time to initialize

      return false; // Visualization was not ready
    }

    return true; // Visualization is ready
  },
};

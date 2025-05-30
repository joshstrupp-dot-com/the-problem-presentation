// Debug overlay for visualization state
(function () {
  // Create debug overlay
  const overlay = document.createElement("div");
  overlay.id = "debug-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #0f0;
    font-family: monospace;
    font-size: 12px;
    padding: 15px;
    border-radius: 5px;
    max-width: 400px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 10000;
    display: none;
  `;
  document.body.appendChild(overlay);

  // Toggle with keyboard shortcut (Ctrl/Cmd + D)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      overlay.style.display =
        overlay.style.display === "none" ? "block" : "none";
    }
  });

  // Log function
  const log = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement("div");
    entry.style.marginBottom = "5px";
    entry.style.borderLeft = `3px solid ${
      type === "cleanup" ? "#f00" : type === "create" ? "#0f0" : "#ff0"
    }`;
    entry.style.paddingLeft = "5px";
    entry.innerHTML = `<small>[${timestamp}]</small> ${message}`;
    overlay.insertBefore(entry, overlay.firstChild);

    // Keep only last 20 entries
    while (overlay.children.length > 20) {
      overlay.removeChild(overlay.lastChild);
    }
  };

  // Monitor visualization groups
  let currentStep = null;
  let currentGroup = null;

  // Override cleanupPreviousVisualizations to log
  const originalCleanup = window.cleanupPreviousVisualizations;
  if (originalCleanup) {
    window.cleanupPreviousVisualizations = function (fromStep, toStep) {
      log(`Cleanup: ${fromStep} → ${toStep}`, "cleanup");
      return originalCleanup.apply(this, arguments);
    };
  }

  // Listen for visualization updates
  document.addEventListener("visualizationUpdate", (e) => {
    const step = e.detail?.step;
    if (step) {
      log(`Viz Update: ${step}`, "create");
    }
  });

  // Listen for grid visualization updates
  document.addEventListener("gridVisualizationUpdate", (e) => {
    const step = e.detail?.step;
    if (step) {
      log(`Grid Update: ${step}`, "create");
    }
  });

  // Listen for cleanup events
  document.addEventListener("visualizationCleanup", () => {
    log("Cleanup Event Dispatched", "cleanup");
  });

  // Monitor DOM for persistent elements
  setInterval(() => {
    const persistentElements = [
      "#chapter-1-grid-absolute",
      "#background-images",
      "#cursor-trail-parent",
      "#chapter-1",
      "#chapter-2",
      "#chapter-3",
      "#chapter-3-3d",
    ];

    const existing = persistentElements.filter((sel) =>
      document.querySelector(sel)
    );
    if (existing.length > 0) {
      const status = document.createElement("div");
      status.style.cssText =
        "border-top: 1px solid #333; margin-top: 10px; padding-top: 10px;";
      status.innerHTML = `<strong>Active Elements:</strong><br>${existing.join(
        "<br>"
      )}`;

      // Replace status if it exists
      const oldStatus = overlay.querySelector(".status");
      if (oldStatus) oldStatus.remove();
      status.className = "status";
      overlay.appendChild(status);
    }
  }, 1000);

  // Initial message
  log("Debug overlay loaded. Press Ctrl/Cmd+D to toggle.");
  log("Monitoring visualization state...");
})();

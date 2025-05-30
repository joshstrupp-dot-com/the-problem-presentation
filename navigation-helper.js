// Navigation helper for testing
(function () {
  // Function to scroll to a specific step
  window.goToStep = function (stepId) {
    const stepElement = document.querySelector(`[data-step="${stepId}"]`);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: "smooth", block: "center" });
      console.log(`Scrolled to step: ${stepId}`);
    } else {
      console.error(`Step not found: ${stepId}`);
      // List available steps
      const availableSteps = Array.from(
        document.querySelectorAll("[data-step]")
      ).map((el) => el.getAttribute("data-step"));
      console.log("Available steps:", availableSteps);
    }
  };

  // Function to list all steps
  window.listSteps = function () {
    const steps = window.stepsConfig.map((step, index) => ({
      index,
      id: step.id,
      text: step.text.substring(0, 50) + "...",
    }));
    console.table(steps);
  };

  // Function to test navigation between steps
  window.testNavigation = function (fromStepId, toStepId, delay = 2000) {
    console.log(`Testing navigation: ${fromStepId} → ${toStepId}`);

    // Go to first step
    goToStep(fromStepId);

    // After delay, go to second step
    setTimeout(() => {
      goToStep(toStepId);

      // After another delay, go back
      setTimeout(() => {
        console.log(`Going back to: ${fromStepId}`);
        goToStep(fromStepId);
      }, delay);
    }, delay);
  };

  // Test specific problematic navigation paths
  window.testProblematicPaths = function () {
    const paths = [
      ["external-internal-sort", "samuel-smiles"],
      ["all-years", "chapter-3"],
      ["credibility-score", "earned-credibility"],
      ["l-ron-hubbard", "conclusion"],
    ];

    console.log("Testing problematic navigation paths...");

    paths.forEach(([from, to], index) => {
      setTimeout(() => {
        console.log(`\n--- Test ${index + 1}: ${from} ↔ ${to} ---`);
        testNavigation(from, to, 3000);
      }, index * 10000); // 10 seconds between each test
    });
  };

  console.log(`
Navigation Helper Loaded!
Available commands:
- goToStep('step-id') - Navigate to a specific step
- listSteps() - List all available steps
- testNavigation('from-id', 'to-id') - Test navigation between two steps
- testProblematicPaths() - Test previously problematic navigation paths
  `);
})();

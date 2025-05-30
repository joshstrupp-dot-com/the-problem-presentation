# Visualization Navigation Fix Summary

## Problem

When navigating backward between steps, visualizations would disappear or persist incorrectly:

1. Steps like `external-internal-sort` and `all-years` would show blank when scrolled to from a different chapter
2. These steps only dispatched events to update existing visualizations but didn't recreate them if they were cleaned up
3. **Root cause**: Visualization scripts are wrapped in IIFEs (Immediately Invoked Function Expressions) that only run once when loaded, so recreating containers doesn't reinitialize the visualizations

## Solution

Created a `VisualizationManager` that can properly reload visualization scripts by:

1. Removing existing script tags
2. Clearing event listeners
3. Re-injecting scripts with cache-busting parameters to force re-execution

### New Architecture

#### VisualizationManager (`js/visualization-manager.js`)

- Tracks all visualization scripts and their containers
- Provides `reloadVisualization()` to force reload a script
- Provides `ensureVisualizationInitialized()` to check and reload if needed
- Handles script removal, container clearing, and cache-busting

#### Updated Steps

All non-primary steps now:

1. Check if their visualization exists AND has content (e.g., SVG elements)
2. If missing, use VisualizationManager to reload the entire script
3. Otherwise, just dispatch the update event

### Updated Steps

#### Chapter 1 Group

- `ml-categories` - Uses VisualizationManager to reload chapter-1 if needed
- `external-internal-sort` - Uses VisualizationManager to reload chapter-1 if needed

#### Chapter 2 Group

- `post-20s` - Uses VisualizationManager to reload chapter-2 if needed
- `neoliberal-shift` - Uses VisualizationManager to reload chapter-2 if needed
- `all-years` - Uses VisualizationManager to reload chapter-2 if needed

#### Chapter 3 Group

- `quality-authors` - Uses VisualizationManager to reload chapter-3 if needed
- `credibility-score` - Uses VisualizationManager to reload chapter-3 if needed
- `l-ron-hubbard` - Uses VisualizationManager to reload chapter-3-3d if needed

## Testing

### Manual Testing

1. Navigate to `external-internal-sort`, then to `samuel-smiles`, then back up
   - ✅ Should now see the chapter-1 visualization fully restored
2. Navigate to `all-years`, then to `chapter-3`, then back up
   - ✅ Should now see the chapter-2 visualization fully restored

### Test Page

Open `test-visualization-reload.html` to test visualization reloading in isolation:

- Click buttons to test reloading each chapter's visualization
- Watch console output to see the reload process

### Console Testing

Open the browser console and use these commands:

```javascript
// List all available steps
listSteps();

// Navigate directly to a step
goToStep("external-internal-sort");

// Test navigation between two steps
testNavigation("external-internal-sort", "samuel-smiles");

// Run all problematic path tests
testProblematicPaths();

// Test visualization reload directly
window.VisualizationManager.reloadVisualization("chapter-1");
```

### Debug Overlay

Press Cmd+D (Mac) or Ctrl+D (Windows) to toggle the debug overlay and see:

- Visualization creation/update events
- Cleanup events
- Active DOM elements

## Technical Details

### Example Step Implementation

```javascript
render: () => {
  // Check if visualization exists and has content
  const container = d3.select("#chapter-1");
  const hasVisualization =
    !container.empty() && container.select("svg").size() > 0;

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
};
```

This approach ensures that visualizations are properly reinitialized when navigating back to them, solving the issue where IIFEs only run once.

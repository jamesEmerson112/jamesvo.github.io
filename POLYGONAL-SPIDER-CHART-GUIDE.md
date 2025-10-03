# PolygonalSpiderChart Component - Documentation

## Overview

The **PolygonalSpiderChart** is a custom Svelte component that visualizes multi-dimensional data using a spider/radar chart with **polygonal grid lines** instead of traditional circular grids. Built with D3.js, it provides a modern, geometric alternative to standard spider charts.

### Key Features

- ✅ **Polygonal Grid Lines** - Geometric polygons instead of circles
- ✅ **Fully Dynamic** - Adapts to any number of axes (3, 6, 8, 12, etc.)
- ✅ **Reactive Levels** - Adjustable grid density (3-10+ levels)
- ✅ **Professional Styling** - Label boxes, axis dots, data points
- ✅ **Customizable Colors** - Any color scheme support
- ✅ **Smooth Animations** - Fade-in effects and transitions
- ✅ **Responsive** - Works with any size configuration

---

## Installation

The component is located at `src/components/PolygonalSpiderChart.svelte` and requires D3.js:

```bash
npm install d3
```

---

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array of data points with `axis` and `value` properties |
| `size` | Number | `400` | Chart dimensions in pixels (width and height) |
| `levels` | Number | `5` | Number of concentric polygonal grid lines |
| `color` | String | `'#ff3e00'` | Color for data polygon, outline, and data points |
| `showLabels` | Boolean | `true` | Whether to display axis labels |
| `min` | Number | `0` | Minimum value for the scale |
| `max` | Number | `100` | Maximum value for the scale |

---

## Basic Usage

### Simple Example (6 Axes - Hexagon)

```svelte
<script>
  import PolygonalSpiderChart from './components/PolygonalSpiderChart.svelte';

  const characterStats = [
    { axis: "Strength", value: 85 },
    { axis: "Agility", value: 78 },
    { axis: "Intelligence", value: 92 },
    { axis: "Endurance", value: 70 },
    { axis: "Dexterity", value: 88 },
    { axis: "Charisma", value: 65 }
  ];
</script>

<PolygonalSpiderChart
  data={characterStats}
  size={400}
  levels={5}
  color="#2196F3"
  min={0}
  max={100}
/>
```

### Triangle Example (3 Axes)

```svelte
<script>
  const simplifiedStats = [
    { axis: "Physical", value: 85 },
    { axis: "Mental", value: 92 },
    { axis: "Social", value: 65 }
  ];
</script>

<PolygonalSpiderChart
  data={simplifiedStats}
  size={350}
  levels={4}
  color="#9C27B0"
/>
```

### Octagon Example (8 Axes)

```svelte
<script>
  const detailedStats = [
    { axis: "Strength", value: 85 },
    { axis: "Agility", value: 78 },
    { axis: "Intelligence", value: 92 },
    { axis: "Endurance", value: 70 },
    { axis: "Dexterity", value: 88 },
    { axis: "Charisma", value: 65 },
    { axis: "Wisdom", value: 75 },
    { axis: "Luck", value: 82 }
  ];
</script>

<PolygonalSpiderChart
  data={detailedStats}
  size={500}
  levels={10}
  color="#4CAF50"
/>
```

---

## Dynamic Reactivity

### The Number of Axes is Fully Dynamic

The chart automatically adapts to the data array length:

```svelte
<script>
  let stats = $state([
    { axis: "Stat A", value: 80 },
    { axis: "Stat B", value: 70 }
  ]);

  function addAxis() {
    stats = [...stats, { axis: `Stat ${String.fromCharCode(65 + stats.length)}`, value: 60 }];
    // Chart automatically redraws with new polygon shape!
  }
</script>

<PolygonalSpiderChart data={stats} />
<button on:click={addAxis}>Add Axis</button>
```

**Result**: The chart transforms from a 2-sided line → triangle → square → pentagon → hexagon as axes are added!

### Grid Levels are Dynamic

```svelte
<script>
  let gridLevels = $state(5);
</script>

<PolygonalSpiderChart
  data={characterStats}
  levels={gridLevels}
/>

<input type="range" min="3" max="10" bind:value={gridLevels} />
<!-- Grid density updates in real-time! -->
```

---

## Customization Guide

### Adjusting Outline Thickness

**Location**: `src/components/PolygonalSpiderChart.svelte` (around line 158)

```svelte
<!-- Data polygon (stroke) -->
<polygon
  stroke-width="5"  ← CHANGE THIS VALUE
  stroke={color}
  fill="none"
/>
```

**Recommended Values**:
- `3` - Subtle, refined
- `4` - Balanced (good default)
- `5` - Bold, prominent
- `6+` - Very thick (may overwhelm)

### Color Schemes

**Single-Metric Charts:**
```svelte
<!-- Blue Theme -->
<PolygonalSpiderChart color="#2196F3" />

<!-- Purple Theme -->
<PolygonalSpiderChart color="#9C27B0" />

<!-- Green Theme -->
<PolygonalSpiderChart color="#4CAF50" />

<!-- Red Theme -->
<PolygonalSpiderChart color="#F44336" />
```

**Dual-Metric Charts with Opacity:**
```svelte
<!-- Blue (Code) -->
<polygon fill="rgba(59, 130, 246, 0.25)" />  <!-- Default -->
<polygon fill="rgba(59, 130, 246, 0.5)" />   <!-- Hover -->

<!-- Red (Complexity) -->
<polygon fill="rgba(239, 68, 68, 0.25)" />   <!-- Default -->
<polygon fill="rgba(239, 68, 68, 0.5)" />    <!-- Hover -->

<!-- Green/Purple Alternative -->
<polygon fill="rgba(76, 175, 80, 0.25)" />   <!-- Metric 1 -->
<polygon fill="rgba(156, 39, 176, 0.25)" />  <!-- Metric 2 -->
```

**Opacity vs Gradient:**
- **Solid with Opacity**: Modern, flat design; easier to adjust dynamically
- **Radial Gradient**: Traditional; creates depth effect; less flexible for interactivity

### Grid Density

```svelte
<!-- Minimal (3 levels) -->
<PolygonalSpiderChart levels={3} />

<!-- Standard (5 levels) -->
<PolygonalSpiderChart levels={5} />

<!-- Detailed (10 levels) -->
<PolygonalSpiderChart levels={10} />
```

---

## Visual Elements Breakdown

### 1. Polygonal Grid Lines
- **Color**: `#ddd` (light gray)
- **Style**: Dashed lines (`stroke-dasharray="3,3"`)
- **Purpose**: Show value scale at 20%, 40%, 60%, 80%, 100%

### 2. Axis Lines
- **Color**: `#ddd` (light gray)
- **Style**: Solid lines from center to perimeter
- **Count**: One per data point

### 3. Axis Endpoint Dots
- **Size**: `r="3"` pixels
- **Color**: Gray fill with white stroke
- **Purpose**: Mark the end of each axis line

### 4. Data Polygon Fill
- **Style**: Solid color with dynamic opacity (modern flat design)
- **Default Opacity**: 0.25 (25%) for subtle, non-intrusive appearance
- **Hover Opacity**: 0.5 (50%) when metric is active/hovered
- **Transition**: Smooth 0.3s ease transition between states
- **Interactive**: Responds to data point hover for visual focus
- **Alternative**: Can use radial gradient for traditional appearance

### 5. Data Polygon Outline
- **Thickness**: `stroke-width="5"` (customizable)
- **Style**: Solid line (no dashes)
- **Color**: Uses the `color` prop
- **Purpose**: Clearly defines the data shape

### 6. Data Points
- **Size**: `r="4"` pixels
- **Style**: Colored fill with white stroke (2px)
- **Position**: One at each vertex of the data polygon
- **Interactive**: Hover to enlarge

### 7. Axis Labels
- **Background**: White boxes with gray borders
- **Text**: Gray (#666) for readability
- **Font**: 12px, normal weight
- **Position**: Outside the chart perimeter

---

## Legend Implementation

### Overview

The legend provides visual reference for interpreting chart data. For dual-metric visualizations (like code vs complexity), a two-item legend clearly distinguishes between overlapping polygons.

### Basic Legend Structure

```svelte
<!-- Enhanced Legend -->
<div class="legend">
  <div class="legend-item">
    <div class="legend-color code">
      <div class="legend-glow"></div>
    </div>
    <span>Lines of Code</span>
  </div>
  <div class="legend-item">
    <div class="legend-color complexity">
      <div class="legend-glow"></div>
    </div>
    <span>Complexity</span>
  </div>
</div>
```

### Legend Styling (CSS)

```css
.legend {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: rgba(255, 255, 255, 0.8);
}

.legend-color {
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 3px;
}

.legend-color.code {
  background: rgba(59, 130, 246, 0.5);
  border: 1.5px solid rgb(59, 130, 246);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
}

.legend-color.complexity {
  background: rgba(239, 68, 68, 0.5);
  border: 1.5px solid rgb(239, 68, 68);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
}

.legend-glow {
  position: absolute;
  inset: -2px;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.legend-item:hover .legend-glow {
  opacity: 1;
}

.legend-color.code .legend-glow {
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.8);
}

.legend-color.complexity .legend-glow {
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
}
```

### Key Features

**Visual Elements:**
- **Color Squares**: 16x16px rounded squares with semi-transparent fill
- **Border**: 1.5px solid stroke matching the metric color
- **Glow Effect**: Subtle box-shadow for depth
- **Hover Glow**: Enhanced glow on hover for interactivity

**Positioning:**
- **Location**: Bottom center of chart
- **Transform**: `translateX(-50%)` for perfect centering
- **Background**: Semi-transparent black with blur effect
- **Padding**: Rounded pill shape (border-radius: 20px)

**Dual-Metric Support:**
- **Flexible Layout**: Flexbox with gap between items
- **Color Coding**: Each item matches its polygon color
- **Clear Labels**: Descriptive text for each metric
- **Compact Design**: Doesn't overwhelm the visualization

### Single-Metric Legend

For single-metric charts, use a simplified version:

```svelte
<div class="legend">
  <div class="legend-item">
    <div class="legend-color" style="
      background: rgba(33, 150, 243, 0.5);
      border: 1.5px solid #2196F3;
      box-shadow: 0 0 8px rgba(33, 150, 243, 0.4);
    ">
      <div class="legend-glow"></div>
    </div>
    <span>Data Values</span>
  </div>
</div>
```

### Multi-Metric Legend (3+ Metrics)

For more than two metrics, extend the pattern:

```svelte
<div class="legend">
  <div class="legend-item">
    <div class="legend-color metric-1">...</div>
    <span>Metric 1</span>
  </div>
  <div class="legend-item">
    <div class="legend-color metric-2">...</div>
    <span>Metric 2</span>
  </div>
  <div class="legend-item">
    <div class="legend-color metric-3">...</div>
    <span>Metric 3</span>
  </div>
</div>
```

### Customization Options

**Color Variants:**
```css
/* Green theme */
.legend-color.success {
  background: rgba(76, 175, 80, 0.5);
  border: 1.5px solid #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.4);
}

/* Purple theme */
.legend-color.premium {
  background: rgba(156, 39, 176, 0.5);
  border: 1.5px solid #9C27B0;
  box-shadow: 0 0 8px rgba(156, 39, 176, 0.4);
}
```

**Position Variants:**
```css
/* Top right */
.legend.top-right {
  top: 8px;
  right: 8px;
  left: auto;
  transform: none;
}

/* Outside bottom */
.legend.external {
  position: relative;
  margin-top: 1rem;
}
```

### Best Practices

1. **Keep It Concise**: Use short, clear labels
2. **Match Colors Exactly**: Legend colors should match polygon colors
3. **Consistent Positioning**: Place legend in same spot across all charts
4. **Interactive Feedback**: Add hover effects for better UX
5. **Accessibility**: Ensure sufficient color contrast for readability

---

## Interactive Hover Opacity

### Overview

Interactive opacity creates visual focus by highlighting the active metric when hovering over data points. This reduces visual clutter and makes it easier to examine individual metrics in dual-metric visualizations.

### Implementation

**Default State (25% opacity):**
```svelte
<polygon
  points={polygonPoints}
  fill="rgba(59, 130, 246, 0.25)"
  style="transition: fill 0.3s ease;"
/>
```

**Hover State (50% opacity):**
```svelte
<polygon
  points={polygonPoints}
  fill="rgba(59, 130, 246, {hoveredMetric === 'code' ? 0.5 : 0.25})"
  style="transition: fill 0.3s ease;"
/>
```

### Complete Example

```svelte
<script>
  let hoveredMetric = null;

  function handlePointHover(metric) {
    hoveredMetric = metric;
  }

  function handlePointLeave() {
    hoveredMetric = null;
  }
</script>

<!-- Code polygon with dynamic opacity -->
<polygon
  points={codePolygonPoints}
  fill="rgba(59, 130, 246, {hoveredMetric === 'code' ? 0.5 : 0.25})"
  style="transition: fill 0.3s ease;"
/>

<!-- Complexity polygon with dynamic opacity -->
<polygon
  points={complexityPolygonPoints}
  fill="rgba(239, 68, 68, {hoveredMetric === 'complexity' ? 0.5 : 0.25})"
  style="transition: fill 0.3s ease;"
/>

<!-- Data points trigger hover state -->
{#each codePoints as point}
  <circle
    on:mouseenter={() => handlePointHover('code')}
    on:mouseleave={handlePointLeave}
  />
{/each}
```

### Key Features

- **Subtle Default**: 0.25 (25%) opacity keeps both metrics visible without overwhelming
- **Clear Focus**: 0.5 (50%) opacity on hover makes the active metric prominent
- **Smooth Transition**: 0.3s ease provides fluid opacity changes
- **Reactive**: Uses Svelte's reactivity to update fill color dynamically
- **Non-intrusive**: Unhovere metric stays at 0.25, maintaining context

### Benefits

1. **Reduced Visual Clutter**: Subtle default opacity prevents overwhelming overlays
2. **Clear Metric Examination**: Hover to brighten the metric you're examining
3. **Maintained Context**: Non-active metric remains visible at lower opacity
4. **Professional Appearance**: Smooth transitions feel polished
5. **Better Data Exploration**: Easier to focus on one metric at a time

---

## Dual-Metric Implementation

### Overview

Display two overlapping metrics on the same polygonal spider chart with distinct colors and interactive hover states. Perfect for comparing related data dimensions like code volume vs complexity.

### Structure

```svelte
<!-- Complexity polygon (drawn first, appears behind) -->
<polygon
  points={complexityPolygonPoints}
  fill="rgba(239, 68, 68, {hoveredMetric === 'complexity' ? 0.5 : 0.25})"
  style="transition: fill 0.3s ease;"
/>
<polygon
  points={complexityPolygonPoints}
  fill="none"
  stroke="rgb(239, 68, 68)"
  stroke-width="5"
/>

<!-- Code polygon (drawn second, appears on top) -->
<polygon
  points={codePolygonPoints}
  fill="rgba(59, 130, 246, {hoveredMetric === 'code' ? 0.5 : 0.25})"
  style="transition: fill 0.3s ease;"
/>
<polygon
  points={codePolygonPoints}
  fill="none"
  stroke="rgb(59, 130, 246)"
  stroke-width="5"
/>
```

### Color Coding

**Primary Metric (Code):**
- Fill: `rgba(59, 130, 246, opacity)` - Blue
- Stroke: `rgb(59, 130, 246)` - Solid blue outline

**Secondary Metric (Complexity):**
- Fill: `rgba(239, 68, 68, opacity)` - Red
- Stroke: `rgb(239, 68, 68)` - Solid red outline

### Data Points

Each metric has its own set of data points:

```svelte
<!-- Code data points (blue) -->
{#each codePoints as point}
  <circle
    fill="rgb(59, 130, 246)"
    on:mouseenter={() => handlePointHover('code')}
  />
{/each}

<!-- Complexity data points (red) -->
{#each complexityPoints as point}
  <circle
    fill="rgb(239, 68, 68)"
    on:mouseenter={() => handlePointHover('complexity')}
  />
{/each}
```

### Best Practices

1. **Drawing Order**: Draw secondary metric first so primary appears on top
2. **Opacity Levels**: Use 0.25 default, 0.5 hover for clear distinction
3. **Color Choice**: Use contrasting colors (blue/red, green/purple, etc.)
4. **Stroke Width**: 5px provides clear outlines without overwhelming
5. **Coordinated Hover**: Track which metric is hovered for synchronized effects

### Use Cases

- **Code Analysis**: Lines of code vs complexity
- **Performance Metrics**: Speed vs accuracy
- **Product Comparison**: Features vs cost
- **Skill Assessment**: Technical vs soft skills
- **System Health**: CPU vs memory usage

---

## Technical Implementation

### Core Reactive Calculations

```javascript
// Chart geometry
$: center = size / 2;
$: radius = (size / 2) - 60;
$: angleSlice = (Math.PI * 2) / data.length;

// Normalized data with angles
$: normalizedData = data.map((d, i) => ({
  ...d,
  angle: angleSlice * i - Math.PI / 2,
  normalizedValue: ((d.value - min) / (max - min)) * 100
}));
```

### Polygon Point Generation

```javascript
function getPolygonPoints(levelPercent) {
  const levelRadius = radius * (levelPercent / 100);
  return normalizedData.map(d => {
    const x = center + levelRadius * Math.cos(d.angle);
    const y = center + levelRadius * Math.sin(d.angle);
    return `${x},${y}`;
  }).join(' ');
}
```

### SVG Rendering Order (Important!)

Elements are rendered in this order (bottom to top):
1. Grid polygons
2. Axis lines and dots
3. Data polygon fill (with gradient)
4. Data polygon stroke (solid outline)
5. Axis labels (with background boxes)
6. Data points (on top of everything)

This order ensures data points are always visible on the polygon.

---

## Comparison: Polygonal vs Circular Grids

| Feature | Polygonal Grid | Circular Grid |
|---------|----------------|---------------|
| **Grid Shape** | Polygons (follows axes) | Circles (concentric) |
| **Visual Style** | Geometric, angular | Smooth, traditional |
| **Best For** | Modern UI, technical data | Classic charts, general use |
| **Uniqueness** | Distinctive, eye-catching | Familiar, conventional |

---

## Use Cases

### 1. Gaming Character Stats
Perfect for RPG/game character attributes:
- Strength, Agility, Intelligence, etc.
- 6-8 axes work well for standard RPG stats
- Color coding for classes (warrior=red, mage=blue)

### 2. Skill Assessment
Professional skill visualization:
- Technical skills (JavaScript, Python, etc.)
- Soft skills (Communication, Leadership, etc.)
- 5-8 axes for comprehensive view

### 3. Product Comparison
Compare products on multiple dimensions:
- Performance, Features, Support, Cost, etc.
- 4-6 axes for clear comparison
- Use different colors for each product

### 4. Performance Metrics
System/application metrics:
- Speed, Reliability, Efficiency, etc.
- Any number of axes based on metrics
- Real-time updates with dynamic data

---

## Advanced Customization

### Creating Multiple Charts for Comparison

```svelte
<script>
  const player1 = [...];
  const player2 = [...];
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
  <PolygonalSpiderChart data={player1} color="#2196F3" />
  <PolygonalSpiderChart data={player2} color="#F44336" />
</div>
```

### Dynamic Data Updates

```svelte
<script>
  import { writable } from 'svelte/store';

  const stats = writable([
    { axis: "Strength", value: 85 },
    // ...
  ]);

  function updateStat(index, newValue) {
    stats.update(s => {
      s[index].value = newValue;
      return s;
    });
    // Chart auto-updates!
  }
</script>

<PolygonalSpiderChart data={$stats} />
```

---

## Performance Notes

- **Optimal Axes**: 3-10 axes for readability
- **Maximum Recommended**: 12 axes (beyond this, labels may overlap)
- **Grid Levels**: 3-10 levels (too many clutters the chart)
- **Animation**: Lightweight, uses CSS and SVG animations

---

## Troubleshooting

### Issue: Labels Overlapping
**Solution**: Reduce number of axes or increase `size` prop

### Issue: Outline Not Visible
**Solution**: Check `stroke-width` value (recommended: 3-5)

### Issue: Colors Not Matching
**Solution**: Verify `color` prop uses correct hex/rgb value

### Issue: Chart Too Small
**Solution**: Increase `size` prop (try 500-600 for larger displays)

---

## Code Location

- **Component**: `src/components/PolygonalSpiderChart.svelte`
- **Demo**: `src/components/GamingCharacterDemo.svelte`
- **Dependencies**: D3.js (`d3` package)

---

## Example: Complete Gaming Character Demo

```svelte
<script>
  import PolygonalSpiderChart from './components/PolygonalSpiderChart.svelte';

  const characterStats = [
    { axis: "Strength", value: 85 },
    { axis: "Agility", value: 78 },
    { axis: "Intelligence", value: 92 },
    { axis: "Endurance", value: 70 },
    { axis: "Dexterity", value: 88 },
    { axis: "Charisma", value: 65 }
  ];
</script>

<section class="character-card">
  <h2>Eldrin the Arcane Warrior</h2>
  <p class="level">Level 45 • Battlemage</p>

  <PolygonalSpiderChart
    data={characterStats}
    size={400}
    levels={5}
    color="#2196F3"
    showLabels={true}
    min={0}
    max={100}
  />
</section>

<style>
  .character-card {
    background: rgba(20, 10, 40, 0.95);
    border-radius: 24px;
    padding: 3rem;
    border: 2px solid rgba(33, 150, 243, 0.3);
  }

  h2 {
    color: #2196F3;
    font-size: 2rem;
    margin: 0;
  }

  .level {
    color: rgba(255, 255, 255, 0.7);
    margin: 0.5rem 0 2rem;
  }
</style>
```

---

## Future Enhancements

Potential features to add:
- Multiple data series overlay
- Export to PNG/SVG
- Custom tooltip component
- Interactive data point editing
- Animation timing controls
- Gradient customization options

---

## Credits

- Built with [Svelte 5](https://svelte.dev)
- Powered by [D3.js](https://d3js.org)
- Inspired by [svelte-spider-chart](https://github.com/EarthNetOrg/webchart)

---

## License

Part of the jamesvo.github.io project.

Last Updated: October 3, 2025

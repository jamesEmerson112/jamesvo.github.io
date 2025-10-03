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
- **Style**: Radial gradient from center to edges
- **Opacity**: Fades from 0.6 to 0.2
- **Animation**: Scales in from 80% to 100%

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

<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let data = [];
  export let size = 400;
  export let levels = 5;
  export let color = '#ff3e00';
  export let showLabels = true;
  export let min = 0;
  export let max = 100;

  let svgElement;
  let mounted = false;

  // Reactive calculations
  $: center = size / 2;
  $: radius = (size / 2) - 60;
  $: angleSlice = (Math.PI * 2) / data.length;

  // Normalize data values
  $: normalizedData = data.map((d, i) => ({
    ...d,
    angle: angleSlice * i - Math.PI / 2,
    normalizedValue: ((d.value - min) / (max - min)) * 100
  }));

  // Generate polygonal grid points
  function getPolygonPoints(levelPercent) {
    const levelRadius = radius * (levelPercent / 100);
    return normalizedData.map(d => {
      const x = center + levelRadius * Math.cos(d.angle);
      const y = center + levelRadius * Math.sin(d.angle);
      return `${x},${y}`;
    }).join(' ');
  }

  // Generate data polygon points
  function getDataPolygonPoints() {
    return normalizedData.map(d => {
      const dataRadius = radius * (d.normalizedValue / 100);
      const x = center + dataRadius * Math.cos(d.angle);
      const y = center + dataRadius * Math.sin(d.angle);
      return `${x},${y}`;
    }).join(' ');
  }

  // Calculate label position
  function getLabelPosition(d) {
    const labelRadius = radius + 30;
    return {
      x: center + labelRadius * Math.cos(d.angle),
      y: center + labelRadius * Math.sin(d.angle)
    };
  }

  // Get text anchor based on angle
  function getTextAnchor(angle) {
    const deg = (angle * 180 / Math.PI + 90) % 360;
    if (deg > 80 && deg < 100) return 'middle';
    if (deg > 260 && deg < 280) return 'middle';
    return deg > 90 && deg < 270 ? 'end' : 'start';
  }

  onMount(() => {
    mounted = true;

    // Animate in
    if (svgElement) {
      d3.select(svgElement)
        .style('opacity', 0)
        .transition()
        .duration(600)
        .style('opacity', 1);
    }
  });
</script>

<div class="polygonal-spider-chart">
  <svg
    bind:this={svgElement}
    width={size}
    height={size}
    viewBox="0 0 {size} {size}"
  >
    <defs>
      <!-- Gradient for data polygon -->
      <radialGradient id="polyGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:{color};stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:{color};stop-opacity:0.2" />
      </radialGradient>

      <!-- Glow filter -->
      <filter id="polyGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Polygonal grid levels -->
    <g class="grid-polygons">
      {#each Array(levels) as _, i}
        {@const level = ((i + 1) / levels) * 100}
        <polygon
          points={getPolygonPoints(level)}
          fill="none"
          stroke="#ddd"
          stroke-width="1"
          stroke-dasharray="3,3"
          class="grid-polygon"
        />
        <!-- Grid level label -->
        <text
          x={center + 8}
          y={center - (radius * (level / 100)) + 4}
          font-size="9"
          fill="rgba(255, 255, 255, 0.5)"
          class="grid-label"
        >
          {Math.round((level / 100) * max)}
        </text>
      {/each}
    </g>

    <!-- Axis lines -->
    <g class="axis-lines">
      {#each normalizedData as d}
        {@const endX = center + radius * Math.cos(d.angle)}
        {@const endY = center + radius * Math.sin(d.angle)}
        <line
          x1={center}
          y1={center}
          x2={endX}
          y2={endY}
          stroke="#ddd"
          stroke-width="1"
          class="axis-line"
        />
        <!-- Axis endpoint dot -->
        <circle
          cx={endX}
          cy={endY}
          r="3"
          fill="#ddd"
          stroke="#fff"
          stroke-width="1"
          class="axis-dot"
        />
      {/each}
    </g>

    <!-- Data polygon (filled area) -->
    {#if mounted}
      <polygon
        points={getDataPolygonPoints()}
        fill="url(#polyGradient)"
        class="data-area"
        style="animation: fadeInArea 0.8s ease-out forwards;"
      />
    {/if}

    <!-- Data polygon (stroke) -->
    <polygon
      points={getDataPolygonPoints()}
      fill="none"
      stroke={color}
      stroke-width="3"
      class="data-stroke"
    />

    <!-- Axis labels with background boxes -->
    {#if showLabels}
      {#each normalizedData as d}
        {@const pos = getLabelPosition(d)}
        {@const textWidth = d.axis.length * 7 + 8}
        {@const boxHeight = 20}
        <!-- Label background box -->
        <rect
          x={pos.x - textWidth / 2}
          y={pos.y - boxHeight / 2}
          width={textWidth}
          height={boxHeight}
          rx="3"
          ry="3"
          fill="#ffffff"
          stroke="#999"
          stroke-width="1"
          class="label-box"
        />
        <!-- Label text -->
        <text
          x={pos.x}
          y={pos.y}
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="12"
          font-weight="normal"
          fill="#666"
          class="axis-label"
        >
          {d.axis}
        </text>
      {/each}
    {/if}

    <!-- Data points - rendered last to be on top -->
    {#each normalizedData as d, i}
      {@const dataRadius = radius * (d.normalizedValue / 100)}
      {@const pointX = center + dataRadius * Math.cos(d.angle)}
      {@const pointY = center + dataRadius * Math.sin(d.angle)}
      <circle
        cx={pointX}
        cy={pointY}
        r="4"
        fill={color}
        stroke="#fff"
        stroke-width="2"
        class="data-point"
      >
        <title>{d.axis}: {d.value}</title>
      </circle>
    {/each}
  </svg>
</div>

<style>
  .polygonal-spider-chart {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    display: block;
    filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.3));
  }

  .grid-polygon {
    transition: all 0.3s ease;
  }

  .grid-polygon:hover {
    stroke: rgba(255, 255, 255, 0.3);
  }

  .axis-line {
    transition: all 0.3s ease;
  }

  .data-area {
    transition: all 0.3s ease;
  }

  .data-stroke {
    /* No transitions or animations */
  }

  .data-point {
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .data-point:hover {
    r: 7 !important;
    stroke-width: 3;
  }

  .axis-label {
    pointer-events: none;
    user-select: none;
  }

  .grid-label {
    pointer-events: none;
    font-weight: 500;
  }

  @keyframes fadeInArea {
    from {
      opacity: 0;
      transform: scale(0.8);
      transform-origin: center;
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popIn {
    0% {
      r: 0;
      opacity: 0;
    }
    50% {
      r: 7;
      opacity: 1;
    }
    100% {
      r: 6;
      opacity: 1;
    }
  }
</style>

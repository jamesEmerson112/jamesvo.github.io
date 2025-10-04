<script>
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import { TECH_DOMAINS } from '../../data/techDomains.js';
  import { domainCounts, selectedTechDomain, setTechDomainFilter } from '../../stores/portfolioStore.js';

  export let showLabels = true;

  let svgElement;
  let mounted = false;
  let containerElement;
  let size = 500; // Default size

  // Update size based on container width
  function updateSize() {
    if (containerElement) {
      const containerWidth = containerElement.offsetWidth;
      // Use container width, but cap at 700px for desktop
      size = Math.min(containerWidth - 32, 700); // 32px for padding
      // Minimum size for readability
      size = Math.max(size, 300);
    }
  }

  onMount(() => {
    mounted = true;
    updateSize();

    // Update size on window resize
    window.addEventListener('resize', updateSize);

    if (svgElement) {
      d3.select(svgElement)
        .style('opacity', 0)
        .transition()
        .duration(300)
        .style('opacity', 1);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  });

  // Prepare domain data with counts
  $: domainData = TECH_DOMAINS.map((domain, i) => ({
    ...domain,
    count: $domainCounts[domain.id] || 0,
    angle: (i / TECH_DOMAINS.length) * 2 * Math.PI - Math.PI / 2, // Start from top
    index: i
  }));

  // Calculate max for scaling
  $: maxCount = Math.max(...domainData.map(d => d.count), 1);

  // Normalize counts to 0-100 scale for radius calculation
  $: normalizedData = domainData.map(d => ({
    ...d,
    normalizedCount: (d.count / maxCount) * 100
  }));

  $: center = size / 2;
  $: radius = (size / 2) - 60;

  // Radial scale for mapping values to radius
  $: radialScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, radius]);

  // Grid levels
  const gridLevels = [25, 50, 75, 100];

  // Polygon points calculation for grid
  function getPolygonPoints(levelPercent) {
    const levelRadius = radius * (levelPercent / 100);
    return normalizedData.map(d => {
      const x = center + levelRadius * Math.cos(d.angle);
      const y = center + levelRadius * Math.sin(d.angle);
      return `${x},${y}`;
    }).join(' ');
  }

  // Calculate data polygon points
  $: dataPolygonPoints = normalizedData.map(d => {
    const r = radialScale(d.normalizedCount);
    const x = center + r * Math.cos(d.angle);
    const y = center + r * Math.sin(d.angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate axis endpoints
  $: axisPoints = normalizedData.map(d => ({
    x: center + radius * Math.cos(d.angle),
    y: center + radius * Math.sin(d.angle),
    angle: d.angle,
    domain: d
  }));

  // Calculate label positions
  $: labelPoints = normalizedData.map(d => {
    const labelRadius = radius + 35;
    return {
      x: center + labelRadius * Math.cos(d.angle),
      y: center + labelRadius * Math.sin(d.angle),
      angle: d.angle,
      domain: d
    };
  });

  // Calculate data points
  $: dataPoints = normalizedData.map(d => ({
    x: center + radialScale(d.normalizedCount) * Math.cos(d.angle),
    y: center + radialScale(d.normalizedCount) * Math.sin(d.angle),
    data: d
  }));

  let hoveredDomain = null;


  function handleDomainClick(domainId) {
    if ($selectedTechDomain === domainId) {
      setTechDomainFilter('all');
    } else {
      setTechDomainFilter(domainId);
    }
  }

  function handleLabelHover(domain) {
    hoveredDomain = domain.id;
  }

  function handleLabelLeave() {
    hoveredDomain = null;
  }

  function getTextAnchor(angle) {
    const deg = (angle * 180 / Math.PI) % 360;
    if (deg > 80 && deg < 100) return 'middle';
    if (deg > 260 && deg < 280) return 'middle';
    return deg > 90 && deg < 270 ? 'end' : 'start';
  }

  function getBaseline(angle) {
    const deg = (angle * 180 / Math.PI) % 360;
    if (deg > 350 || deg < 10) return 'middle';
    if (deg > 170 && deg < 190) return 'middle';
    return deg > 180 ? 'baseline' : 'hanging';
  }
</script>

<div class="tech-spider-chart" bind:this={containerElement}>
  <svg
    bind:this={svgElement}
    width={size}
    height={size}
    viewBox="0 0 {size} {size}"
  >
    <defs>
      <radialGradient id="domainGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.4" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.2" />
      </radialGradient>

      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
      </filter>
    </defs>

    <!-- Grid polygons -->
    <g class="grid-polygons">
      {#each gridLevels as level}
        <polygon
          points={getPolygonPoints(level)}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          stroke-width="1"
          stroke-dasharray="3,3"
        />
      {/each}
    </g>

    <!-- Axis lines -->
    <g class="axis-lines">
      {#each axisPoints as point}
        <line
          x1={center}
          y1={center}
          x2={point.x}
          y2={point.y}
          stroke="rgba(255, 255, 255, 0.12)"
          stroke-width="1.5"
          class="axis-line"
          class:highlighted={hoveredDomain === point.domain.id}
          class:selected={$selectedTechDomain === point.domain.id}
        />
      {/each}
    </g>

    <!-- Data polygon -->
    {#if dataPolygonPoints}
      <polygon
        points={dataPolygonPoints}
        fill="url(#domainGradient)"
        class="data-polygon"
        filter="url(#shadow)"
      />
    {/if}

    <!-- Data polygon outline -->
    {#if dataPolygonPoints}
      <polygon
        points={dataPolygonPoints}
        fill="none"
        stroke="#3b82f6"
        stroke-width="3"
        class="data-polygon-outline"
        filter="url(#glow)"
      />
    {/if}

    <!-- Data points -->
    {#each dataPoints as point}
      <circle
        cx={point.x}
        cy={point.y}
        r="5"
        fill={point.data.color}
        stroke="rgba(255, 255, 255, 0.8)"
        stroke-width="2"
        class="data-point"
        class:selected={$selectedTechDomain === point.data.id}
        style="cursor: pointer;"
        role="button"
        tabindex="0"
        aria-label="{point.data.label}: {point.data.count} projects"
        on:click={() => handleDomainClick(point.data.id)}
        on:keydown={(e) => e.key === 'Enter' && handleDomainClick(point.data.id)}
        on:mouseenter={() => handleLabelHover(point.data)}
        on:mouseleave={handleLabelLeave}
      />
    {/each}

    <!-- Clickable labels -->
    {#if showLabels}
      {#each labelPoints as label}
        <g
          class="label-group"
          class:selected={$selectedTechDomain === label.domain.id}
          class:hovered={hoveredDomain === label.domain.id}
          role="button"
          tabindex="0"
          on:click={() => handleDomainClick(label.domain.id)}
          on:mouseenter={() => handleLabelHover(label.domain)}
          on:mouseleave={handleLabelLeave}
          on:keydown={(e) => e.key === 'Enter' && handleDomainClick(label.domain.id)}
          style="cursor: pointer;"
        >
          <!-- Label background for better readability -->
          <rect
            x={label.x - 30}
            y={label.y - 10}
            width="60"
            height="20"
            rx="4"
            fill="rgba(0, 0, 0, 0.7)"
            class="label-bg"
          />

          <!-- Label text -->
          <text
            x={label.x}
            y={label.y}
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="11"
            font-weight="600"
            fill={label.domain.color}
            class="domain-label"
          >
            {label.domain.label}
          </text>

          <!-- Count badge -->
          <text
            x={label.x}
            y={label.y + 15}
            text-anchor="middle"
            font-size="9"
            fill="rgba(255, 255, 255, 0.6)"
            class="count-badge"
          >
            {label.domain.count} {label.domain.count === 1 ? 'project' : 'projects'}
          </text>
        </g>
      {/each}
    {/if}

    <!-- Center point -->
    <circle
      cx={center}
      cy={center}
      r="3"
      fill="rgba(255, 255, 255, 0.5)"
      stroke="rgba(255, 255, 255, 0.8)"
      stroke-width="1"
    />
  </svg>

  <!-- Filter Status -->
  {#if $selectedTechDomain !== 'all'}
    {@const activeDomain = TECH_DOMAINS.find(d => d.id === $selectedTechDomain)}
    {#if activeDomain}
      <div class="filter-status">
        <span class="filter-label">Filtered by:</span>
        <span class="filter-domain" style="color: {activeDomain.color};">
          {activeDomain.icon} {activeDomain.label}
        </span>
        <button
          class="clear-filter"
          on:click={() => setTechDomainFilter('all')}
          aria-label="Clear filter"
        >
          ✕
        </button>
      </div>
    {/if}
  {/if}

  <!-- Instructions -->
  <div class="instructions">
    <p>Click any domain to filter projects</p>
  </div>
</div>

<style>
  .tech-spider-chart {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.05));
    border-radius: 12px;
    padding: 1rem;
    width: 100%;
    aspect-ratio: 1 / 1;
    max-width: 700px;
    margin: 0 auto;
  }

  svg {
    display: block;
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  }

  .axis-line {
    transition: all 0.3s ease;
  }

  .axis-line.highlighted {
    stroke: rgba(255, 255, 255, 0.3);
    stroke-width: 2;
  }

  .axis-line.selected {
    stroke: #3b82f6;
    stroke-width: 2.5;
  }

  .data-polygon {
    transition: all 0.3s ease;
  }

  .data-point {
    transition: all 0.2s ease;
  }

  .data-point:hover,
  .data-point.selected {
    r: 8;
    filter: drop-shadow(0 0 8px currentColor);
  }

  .label-group {
    transition: all 0.2s ease;
  }

  .label-group:hover .label-bg,
  .label-group.selected .label-bg {
    fill: rgba(0, 0, 0, 0.9);
  }

  .label-group:hover .domain-label,
  .label-group.selected .domain-label,
  .label-group.hovered .domain-label {
    font-size: 13px;
    font-weight: 700;
    filter: drop-shadow(0 0 4px currentColor);
  }

  .label-group:hover .count-badge,
  .label-group.selected .count-badge {
    fill: rgba(255, 255, 255, 0.9);
  }

  .filter-status {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .filter-label {
    color: rgba(255, 255, 255, 0.6);
  }

  .filter-domain {
    font-weight: 600;
  }

  .clear-filter {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.75rem;
    transition: all 0.2s ease;
  }

  .clear-filter:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .instructions {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .instructions p {
    margin: 0;
  }

  @media (max-width: 768px) {
    .tech-spider-chart {
      padding: 0.75rem;
    }

    .filter-status {
      top: 0.5rem;
      right: 0.5rem;
      font-size: 0.75rem;
      padding: 0.375rem 0.5rem;
    }

    .instructions {
      font-size: 0.7rem;
      bottom: 0.5rem;
    }
  }
</style>

<script>
  export let languages = [];
  export let showTotals = true;
  export let sortable = true;
  export let compact = false;

  let sortColumn = 'code'; // Default sort by code lines
  let sortDirection = 'desc';

  // Calculate totals
  $: totals = languages.reduce((acc, lang) => ({
    files: acc.files + (lang.Count || lang.files || 0),
    lines: acc.lines + (lang.Lines || lang.lines || 0),
    blanks: acc.blanks + (lang.Blank || lang.blanks || 0),
    comments: acc.comments + (lang.Comment || lang.comments || 0),
    code: acc.code + (lang.Code || lang.code || 0),
    complexity: acc.complexity + (lang.Complexity || lang.complexity || 0)
  }), { files: 0, lines: 0, blanks: 0, comments: 0, code: 0, complexity: 0 });

  // Normalize language data (handle both sccRaw and computed.languages formats)
  $: normalizedLanguages = languages.map(lang => ({
    name: lang.Name || lang.name,
    files: lang.Count || lang.files || 0,
    lines: lang.Lines || lang.lines || 0,
    blanks: lang.Blank || lang.blanks || 0,
    comments: lang.Comment || lang.comments || 0,
    code: lang.Code || lang.code || 0,
    complexity: lang.Complexity || lang.complexity || 0
  }));

  // Sorted languages
  $: sortedLanguages = sortable
    ? [...normalizedLanguages].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (sortColumn === 'name') {
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      })
    : normalizedLanguages;

  function handleSort(column) {
    if (!sortable) return;

    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'desc';
    }
  }

  function formatNumber(num) {
    return num.toLocaleString();
  }

  function getSortIcon(column) {
    if (sortColumn !== column) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  }
</script>

<div class="table-container" class:compact>
  <table class="metrics-table">
    <thead>
      <tr>
        <th
          class="sortable"
          class:active={sortColumn === 'name'}
          on:click={() => handleSort('name')}
        >
          Language {#if sortable}<span class="sort-icon">{getSortIcon('name')}</span>{/if}
        </th>
        <th
          class="sortable number"
          class:active={sortColumn === 'files'}
          on:click={() => handleSort('files')}
        >
          Files {#if sortable}<span class="sort-icon">{getSortIcon('files')}</span>{/if}
        </th>
        <th
          class="sortable number"
          class:active={sortColumn === 'lines'}
          on:click={() => handleSort('lines')}
        >
          Lines {#if sortable}<span class="sort-icon">{getSortIcon('lines')}</span>{/if}
        </th>
        <th
          class="sortable number"
          class:active={sortColumn === 'blanks'}
          on:click={() => handleSort('blanks')}
        >
          Blanks {#if sortable}<span class="sort-icon">{getSortIcon('blanks')}</span>{/if}
        </th>
        <th
          class="sortable number"
          class:active={sortColumn === 'comments'}
          on:click={() => handleSort('comments')}
        >
          Comments {#if sortable}<span class="sort-icon">{getSortIcon('comments')}</span>{/if}
        </th>
        <th
          class="sortable number highlight"
          class:active={sortColumn === 'code'}
          on:click={() => handleSort('code')}
        >
          Code {#if sortable}<span class="sort-icon">{getSortIcon('code')}</span>{/if}
        </th>
        <th
          class="sortable number"
          class:active={sortColumn === 'complexity'}
          on:click={() => handleSort('complexity')}
        >
          Complexity {#if sortable}<span class="sort-icon">{getSortIcon('complexity')}</span>{/if}
        </th>
      </tr>
    </thead>
    <tbody>
      {#each sortedLanguages as lang, i}
        <tr class:even={i % 2 === 0}>
          <td class="lang-name">{lang.name}</td>
          <td class="number">{formatNumber(lang.files)}</td>
          <td class="number">{formatNumber(lang.lines)}</td>
          <td class="number">{formatNumber(lang.blanks)}</td>
          <td class="number">{formatNumber(lang.comments)}</td>
          <td class="number highlight">{formatNumber(lang.code)}</td>
          <td class="number">{formatNumber(lang.complexity)}</td>
        </tr>
      {/each}
    </tbody>
    {#if showTotals && languages.length > 1}
      <tfoot>
        <tr class="totals-row">
          <td class="lang-name"><strong>Total</strong></td>
          <td class="number"><strong>{formatNumber(totals.files)}</strong></td>
          <td class="number"><strong>{formatNumber(totals.lines)}</strong></td>
          <td class="number"><strong>{formatNumber(totals.blanks)}</strong></td>
          <td class="number"><strong>{formatNumber(totals.comments)}</strong></td>
          <td class="number highlight"><strong>{formatNumber(totals.code)}</strong></td>
          <td class="number"><strong>{formatNumber(totals.complexity)}</strong></td>
        </tr>
      </tfoot>
    {/if}
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
    background: var(--bg-card, rgba(255, 255, 255, 0.05));
    border-radius: 8px;
    border: 1px solid var(--border-primary, rgba(255, 255, 255, 0.1));
  }

  .metrics-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    font-family: 'SF Mono', 'Monaco', 'Menlo', monospace;
  }

  thead {
    position: sticky;
    top: 0;
    background: var(--bg-card, rgba(0, 0, 0, 0.3));
    backdrop-filter: blur(10px);
    z-index: 1;
  }

  th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-secondary, rgba(255, 255, 255, 0.7));
    border-bottom: 2px solid var(--border-primary, rgba(255, 255, 255, 0.2));
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  th.sortable {
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease;
  }

  th.sortable:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-primary, rgba(255, 255, 255, 0.9));
  }

  th.active {
    color: var(--text-primary, rgba(255, 255, 255, 1));
  }

  .sort-icon {
    font-size: 0.8em;
    margin-left: 0.25rem;
    opacity: 0.6;
  }

  th.active .sort-icon {
    opacity: 1;
  }

  th.number,
  td.number {
    text-align: right;
  }

  th.highlight,
  td.highlight {
    background: rgba(59, 130, 246, 0.1);
    font-weight: 600;
  }

  tbody tr {
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  tbody tr.even {
    background: rgba(0, 0, 0, 0.2);
  }

  tbody tr.even:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  td {
    padding: 0.6rem 1rem;
    color: var(--text-primary, rgba(255, 255, 255, 0.9));
    border-bottom: 1px solid var(--border-primary, rgba(255, 255, 255, 0.05));
  }

  td.lang-name {
    font-weight: 500;
    color: var(--text-secondary, rgba(255, 255, 255, 0.8));
  }

  tfoot {
    border-top: 2px solid var(--border-primary, rgba(255, 255, 255, 0.2));
    background: rgba(0, 0, 0, 0.3);
  }

  tfoot td {
    border-bottom: none;
    padding: 0.75rem 1rem;
  }

  .totals-row {
    font-weight: 600;
  }

  .totals-row td {
    color: var(--text-primary, rgba(255, 255, 255, 1));
  }

  .compact .metrics-table {
    font-size: 0.8rem;
  }

  .compact th,
  .compact td {
    padding: 0.5rem 0.75rem;
  }

  @media (max-width: 768px) {
    .metrics-table {
      font-size: 0.75rem;
    }

    th, td {
      padding: 0.5rem;
    }
  }
</style>

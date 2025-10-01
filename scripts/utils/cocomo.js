/**
 * COCOMO (Constructive Cost Model) Calculator
 * Calculates software development effort, time, people, and cost estimates
 * Uses the Organic Model (small to medium projects)
 */

/**
 * AI Task Multipliers - based on how much AI speeds up different development tasks
 */
const AI_TASK_MULTIPLIERS = {
  boilerplate: { multiplier: 0.05, weight: 0.10 },    // 20x faster, 10% of work
  implementation: { multiplier: 0.1, weight: 0.40 },  // 10x faster, 40% of work
  testing: { multiplier: 0.3, weight: 0.15 },         // 3.3x faster, 15% of work
  debugging: { multiplier: 0.5, weight: 0.15 },       // 2x faster, 15% of work
  architecture: { multiplier: 0.7, weight: 0.10 },    // 1.4x faster, 10% of work
  documentation: { multiplier: 0.2, weight: 0.10 }    // 5x faster, 10% of work
};

/**
 * Calculate effective AI multiplier (weighted average)
 * @returns {number} Effective multiplier (~0.255 = 4x faster)
 */
function calculateEffectiveAIMultiplier() {
  return Object.values(AI_TASK_MULTIPLIERS).reduce(
    (sum, task) => sum + (task.multiplier * task.weight),
    0
  );
}

/**
 * Calculate COCOMO metrics for a given codebase
 * @param {number} codeLines - Total lines of code (excluding comments and blanks)
 * @param {number} avgWage - Average annual developer wage (default: $56,286 US average)
 * @returns {object} COCOMO metrics including traditional, AI-assisted, and solo developer estimates
 */
export function calculateCOCOMO(codeLines, avgWage = 56286) {
  // Convert lines to KLOC (thousands of lines of code)
  const KLOC = codeLines / 1000;
  
  // Traditional COCOMO formulas (Organic Model)
  const traditionalEffort = 2.4 * Math.pow(KLOC, 1.05);
  const traditionalTime = 2.5 * Math.pow(traditionalEffort, 0.38);
  const traditionalPeople = traditionalEffort / traditionalTime;
  const traditionalCost = traditionalEffort * (avgWage / 12);
  
  // AI-Assisted calculations
  const effectiveMultiplier = calculateEffectiveAIMultiplier();
  const aiEffort = traditionalEffort * effectiveMultiplier;
  const aiTime = 2.5 * Math.pow(aiEffort, 0.38);
  const aiPeople = aiEffort / aiTime;
  const aiCost = aiEffort * (avgWage / 12);
  
  // Calculate comparison metrics
  const effortReduction = ((traditionalEffort - aiEffort) / traditionalEffort * 100).toFixed(0);
  const timeReduction = ((traditionalTime - aiTime) / traditionalTime * 100).toFixed(0);
  const costReduction = ((traditionalCost - aiCost) / traditionalCost * 100).toFixed(0);
  const speedup = (1 / effectiveMultiplier).toFixed(1);
  
  return {
    traditional: {
      kloc: parseFloat(KLOC.toFixed(3)),
      effort: parseFloat(traditionalEffort.toFixed(2)),
      time: parseFloat(traditionalTime.toFixed(2)),
      people: parseFloat(traditionalPeople.toFixed(2)),
      cost: Math.round(traditionalCost),
      avgWage,
      model: 'organic',
      description: 'Traditional COCOMO estimate'
    },
    
    aiAssisted: {
      effectiveMultiplier: parseFloat(effectiveMultiplier.toFixed(3)),
      effort: parseFloat(aiEffort.toFixed(2)),
      time: parseFloat(aiTime.toFixed(2)),
      people: parseFloat(aiPeople.toFixed(2)),
      cost: Math.round(aiCost),
      description: `With AI assistance (~${speedup}x faster)`,
      taskBreakdown: {
        boilerplate: '20x faster (10% of work)',
        implementation: '10x faster (40% of work)',
        testing: '3.3x faster (15% of work)',
        debugging: '2x faster (15% of work)',
        architecture: '1.4x faster (10% of work)',
        documentation: '5x faster (10% of work)'
      }
    },
    
    comparison: {
      effortReduction: `${effortReduction}%`,
      timeReduction: `${timeReduction}%`,
      costReduction: `${costReduction}%`,
      speedup: `${speedup}x`
    },
    
    singleDeveloper: {
      traditional: {
        fullTime: {
          months: parseFloat(traditionalEffort.toFixed(2)),
          weeks: parseFloat((traditionalEffort * 4.33).toFixed(1)),
          days: Math.round(traditionalEffort * 21.7),
          cost: Math.round(traditionalCost),
          description: 'Traditional full-time solo development'
        },
        partTime: {
          months: parseFloat(traditionalTime.toFixed(2)),
          hoursPerWeek: parseFloat((traditionalPeople * 40).toFixed(1)),
          totalHours: Math.round(traditionalEffort * 173),
          cost: Math.round(traditionalCost),
          description: 'Traditional part-time to match COCOMO schedule'
        }
      },
      aiAssisted: {
        fullTime: {
          months: parseFloat(aiEffort.toFixed(2)),
          weeks: parseFloat((aiEffort * 4.33).toFixed(1)),
          days: Math.round(aiEffort * 21.7),
          cost: Math.round(aiCost),
          description: 'AI-assisted full-time solo development'
        },
        partTime: {
          months: parseFloat(aiTime.toFixed(2)),
          hoursPerWeek: parseFloat((aiPeople * 40).toFixed(1)),
          totalHours: Math.round(aiEffort * 173),
          cost: Math.round(aiCost),
          description: 'AI-assisted part-time development'
        }
      }
    }
  };
}

/**
 * Calculate language percentages from SCC data
 * @param {Array} sccData - Array of language data from SCC
 * @returns {Array} Language data with percentage calculations
 */
export function calculateLanguagePercentages(sccData) {
  // Calculate totals across all languages
  const totals = {
    lines: sccData.reduce((sum, lang) => sum + lang.Lines, 0),
    code: sccData.reduce((sum, lang) => sum + lang.Code, 0),
    bytes: sccData.reduce((sum, lang) => sum + lang.Bytes, 0)
  };
  
  // Add percentage calculations to each language
  return sccData.map(lang => ({
    name: lang.Name,
    lines: lang.Lines,
    code: lang.Code,
    comments: lang.Comment,
    blanks: lang.Blank,
    bytes: lang.Bytes,
    files: lang.Count,
    complexity: lang.Complexity,
    percentOfLines: totals.lines > 0 ? parseFloat(((lang.Lines / totals.lines) * 100).toFixed(1)) : 0,
    percentOfCode: totals.code > 0 ? parseFloat(((lang.Code / totals.code) * 100).toFixed(1)) : 0,
    percentOfBytes: totals.bytes > 0 ? parseFloat(((lang.Bytes / totals.bytes) * 100).toFixed(1)) : 0
  })).sort((a, b) => b.code - a.code); // Sort by code lines descending
}

/**
 * Generate summary statistics from SCC data
 * @param {Array} sccData - Array of language data from SCC
 * @returns {object} Summary statistics
 */
export function generateSummary(sccData) {
  const totals = sccData.reduce((acc, lang) => ({
    lines: acc.lines + lang.Lines,
    code: acc.code + lang.Code,
    comments: acc.comments + lang.Comment,
    blanks: acc.blanks + lang.Blank,
    bytes: acc.bytes + lang.Bytes,
    files: acc.files + lang.Count,
    complexity: acc.complexity + lang.Complexity
  }), {
    lines: 0,
    code: 0,
    comments: 0,
    blanks: 0,
    bytes: 0,
    files: 0,
    complexity: 0
  });
  
  // Find primary language (most code lines)
  const primaryLang = sccData.reduce((max, lang) => 
    lang.Code > max.Code ? lang : max
  , { Code: 0, Name: 'Unknown' });
  
  const primaryPercent = totals.code > 0 
    ? parseFloat(((primaryLang.Code / totals.code) * 100).toFixed(1))
    : 0;
  
  return {
    totalLines: totals.lines,
    totalCode: totals.code,
    totalComments: totals.comments,
    totalBlanks: totals.blanks,
    totalBytes: totals.bytes,
    totalFiles: totals.files,
    totalLanguages: sccData.length,
    totalComplexity: totals.complexity,
    primaryLanguage: primaryLang.Name,
    primaryLanguagePercent: primaryPercent
  };
}

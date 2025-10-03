#!/usr/bin/env node

/**
 * GitHub Repository Scanner
 * Fetches all repositories, scans with SCC, calculates metrics
 * Supports incremental and full scans
 */

import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { anonymizePrivateRepo, shouldIncludeRepo, generateRepoId } from './utils/anonymize.js';
import { scanRepository, initScanner, cleanupScanner } from './scan-repo.js';

// Load environment variables from .env file (for local development)
dotenv.config();

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const metricsDir = join(projectRoot, 'public', 'metrics');
const reposDir = join(metricsDir, 'repos');
const indexPath = join(metricsDir, 'index.json');

// Parse command line arguments
const args = process.argv.slice(2);
const isFullScan = args.includes('--full');
const isTestMode = args.includes('--test');
const isPublicOnly = args.includes('--public-only');
const limitArg = args.find(arg => arg.startsWith('--limit='));
const repoLimit = limitArg ? parseInt(limitArg.split('=')[1]) : null;

// Initialize GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'portfolio-metrics-scanner/1.0',
});

/**
 * Verify GitHub authentication
 */
async function verifyAuth() {
  try {
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`✅ Authenticated as: ${user.login}`);
    console.log(`   Public repos: ${user.public_repos}`);
    console.log(`   Total repos: ${user.total_private_repos + user.public_repos}`);
    return user;
  } catch (error) {
    console.error('❌ Authentication failed!');
    console.error('   Make sure GITHUB_TOKEN is set in your environment or .env file');
    console.error('   Error:', error.message);
    process.exit(1);
  }
}

/**
 * Fetch all repositories from GitHub API
 * @returns {Array} List of repository objects
 */
async function fetchAllRepos() {
  console.log('\n📥 Fetching repositories from GitHub...');

  const allRepos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const { data } = await octokit.repos.listForAuthenticatedUser({
        per_page: 100,
        page,
        type: 'all', // includes both public and private
        sort: 'updated',
        direction: 'desc'
      });

      if (data.length === 0) {
        hasMore = false;
      } else {
        allRepos.push(...data);
        console.log(`   Fetched page ${page}: ${data.length} repos (total: ${allRepos.length})`);
        page++;
      }
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      hasMore = false;
    }
  }

  return allRepos;
}

/**
 * Filter repositories based on criteria
 * @param {Array} repos - List of repositories
 * @returns {Array} Filtered repositories
 */
function filterRepos(repos) {
  console.log('\n🔍 Filtering repositories...');

  let filtered = repos.filter(shouldIncludeRepo);

  // Filter to public only if flag is set
  if (isPublicOnly) {
    filtered = filtered.filter(r => !r.private);
    console.log(`   🌐 Public-only mode enabled`);
  }

  const excluded = repos.length - filtered.length;
  const publicCount = filtered.filter(r => !r.private).length;
  const privateCount = filtered.filter(r => r.private).length;

  console.log(`   Total fetched: ${repos.length}`);
  console.log(`   Excluded (forks/archived): ${excluded}`);
  console.log(`   Public repos: ${publicCount}`);
  console.log(`   Private repos: ${privateCount}`);
  console.log(`   Total to scan: ${filtered.length}`);

  return filtered;
}

/**
 * Load existing metrics index
 * @returns {Object|null} Existing index or null if doesn't exist
 */
async function loadExistingIndex() {
  try {
    const content = await fs.readFile(indexPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.log('   No existing index found, will create new one');
    return null;
  }
}

/**
 * Determine which repos need scanning
 * @param {Array} repos - All filtered repositories
 * @param {Object} existingIndex - Previous scan data
 * @returns {Array} Repos that need scanning
 */
function getReposToScan(repos, existingIndex) {
  if (isFullScan || !existingIndex) {
    console.log('\n🔄 Full scan mode - scanning all repositories');
    return repos;
  }

  console.log('\n⚡ Incremental scan mode - checking for updates...');

  const toScan = repos.filter(repo => {
    const existingRepo = existingIndex.repos.find(r => {
      if (repo.private) {
        // For private repos, match by language and update time
        return r.isPrivate && r.primaryLanguage === repo.language;
      }
      return r.name === repo.name;
    });

    if (!existingRepo) {
      return true; // New repo
    }

    const repoUpdated = new Date(repo.updated_at);
    const lastScanned = new Date(existingRepo.lastUpdated);

    return repoUpdated > lastScanned; // Updated since last scan
  });

  console.log(`   Repos to scan: ${toScan.length} out of ${repos.length}`);
  return toScan;
}

/**
 * Generate master index from processed repos
 * @param {Array} processedRepos - All processed repositories with metrics
 * @param {Object} existingIndex - Previous index (if exists)
 */
async function generateMasterIndex(processedRepos, existingIndex) {
  // Calculate portfolio-wide totals
  const totals = processedRepos.reduce((acc, repo) => ({
    totalLines: acc.totalLines + repo.computed.summary.totalLines,
    totalCode: acc.totalCode + repo.computed.summary.totalCode,
    totalComments: acc.totalComments + repo.computed.summary.totalComments,
    totalBlanks: acc.totalBlanks + repo.computed.summary.totalBlanks,
    totalFiles: acc.totalFiles + repo.computed.summary.totalFiles,
    totalBytes: acc.totalBytes + repo.computed.summary.totalBytes,
    totalComplexity: acc.totalComplexity + repo.computed.summary.totalComplexity,
    totalCost: acc.totalCost + repo.computed.cocomo.traditional.cost,
    totalEffort: acc.totalEffort + repo.computed.cocomo.traditional.effort,
    aiCost: acc.aiCost + repo.computed.cocomo.aiAssisted.cost,
    aiEffort: acc.aiEffort + repo.computed.cocomo.aiAssisted.effort
  }), {
    totalLines: 0,
    totalCode: 0,
    totalComments: 0,
    totalBlanks: 0,
    totalFiles: 0,
    totalBytes: 0,
    totalComplexity: 0,
    totalCost: 0,
    totalEffort: 0,
    aiCost: 0,
    aiEffort: 0
  });

  // Aggregate language statistics
  const languageMap = new Map();

  processedRepos.forEach(repo => {
    repo.computed.languages.forEach(lang => {
      if (!languageMap.has(lang.name)) {
        languageMap.set(lang.name, {
          repos: new Set(),
          totalLines: 0,
          totalCode: 0
        });
      }

      const langData = languageMap.get(lang.name);
      langData.repos.add(repo.id);
      langData.totalLines += lang.lines;
      langData.totalCode += lang.code;
    });
  });

  // Convert language map to object
  const languages = {};
  languageMap.forEach((data, name) => {
    languages[name] = {
      repos: data.repos.size,
      totalLines: data.totalLines,
      totalCode: data.totalCode,
      percentOfTotal: totals.totalLines > 0
        ? parseFloat(((data.totalLines / totals.totalLines) * 100).toFixed(1))
        : 0,
      averagePerRepo: Math.round(data.totalLines / data.repos.size)
    };
  });

  // Count public/private repos
  const publicCount = processedRepos.filter(r => !r.metadata.isPrivate).length;
  const privateCount = processedRepos.filter(r => r.metadata.isPrivate).length;

  // Create master index
  const masterIndex = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    lastFullScan: isFullScan ? new Date().toISOString() : (existingIndex?.lastFullScan || new Date().toISOString()),
    lastIncrementalScan: new Date().toISOString(),
    reposScannedThisRun: processedRepos.length,
    totalPublicRepos: publicCount,
    totalPrivateRepos: privateCount,
    totalRepos: processedRepos.length,

    portfolioTotals: {
      totalLines: totals.totalLines,
      totalCode: totals.totalCode,
      totalComments: totals.totalComments,
      totalBlanks: totals.totalBlanks,
      totalFiles: totals.totalFiles,
      totalBytes: totals.totalBytes,
      totalComplexity: totals.totalComplexity,

      estimatedValue: {
        standardCost: totals.totalCost,
        totalEffort: parseFloat(totals.totalEffort.toFixed(2)),
        avgTime: processedRepos.length > 0
          ? parseFloat((totals.totalEffort / processedRepos.length).toFixed(2))
          : 0,
        avgPeople: 0 // Calculated below
      },

      soloDeveloper: {
        fullTimeMonths: parseFloat(totals.totalEffort.toFixed(2)),
        fullTimeYears: Math.round(totals.totalEffort / 12),
        fullTimeWeeks: Math.round(totals.totalEffort * 4.33),
        description: 'Total time if developed alone, full-time'
      },

      languages
    },

    repos: processedRepos.map(repo => ({
      id: repo.id,
      name: repo.metadata.name,
      url: repo.metadata.url,
      description: repo.metadata.description,
      lastUpdated: repo.metadata.lastUpdated,
      primaryLanguage: repo.computed.summary.primaryLanguage,
      isPrivate: repo.metadata.isPrivate,
      isAnonymized: repo.metadata.isAnonymized,
      languages: repo.computed.languages, // Include language breakdown for spider charts
      summary: {
        lines: repo.computed.summary.totalLines,
        code: repo.computed.summary.totalCode,
        files: repo.computed.summary.totalFiles,
        complexity: repo.computed.summary.totalComplexity,
        traditionalCost: repo.computed.cocomo.traditional.cost,
        aiCost: repo.computed.cocomo.aiAssisted.cost,
        traditionalMonths: repo.computed.cocomo.singleDeveloper.traditional.fullTime.months,
        aiMonths: repo.computed.cocomo.singleDeveloper.aiAssisted.fullTime.months
      },
      detailsFile: `repos/${repo.id}.json`
    }))
  };

  // Save master index
  await fs.writeFile(indexPath, JSON.stringify(masterIndex, null, 2));

  console.log('   ✅ Master index generated');
  console.log(`   Total lines: ${totals.totalLines.toLocaleString()}`);
  console.log(`   Total cost: $${totals.totalCost.toLocaleString()}`);
  console.log(`   Solo dev time: ${Math.round(totals.totalEffort / 12)} years`);
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Portfolio Metrics Scanner');
  console.log('============================\n');

  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ ERROR: GITHUB_TOKEN not found!');
    console.error('   Please create a .env file with your GitHub token');
    console.error('   See .env.example for instructions\n');
    process.exit(1);
  }

  // Display scan mode
  if (isTestMode) {
    console.log(`🧪 Test mode: Limiting to ${repoLimit || 5} repos\n`);
  } else if (isFullScan) {
    console.log('🔄 Full scan mode: All repositories\n');
  } else {
    console.log('⚡ Incremental scan mode: Only updated repos\n');
  }

  // Step 1: Verify authentication
  const user = await verifyAuth();

  // Step 2: Fetch all repositories
  let allRepos = await fetchAllRepos();

  // Step 3: Filter repositories
  const filtered = filterRepos(allRepos);

  // Step 4: Apply test mode limit if needed
  let reposToProcess = filtered;
  if (isTestMode && repoLimit) {
    reposToProcess = filtered.slice(0, repoLimit);
    console.log(`\n🧪 Test mode: Limited to ${reposToProcess.length} repos`);
  }

  // Step 5: Load existing index for incremental scanning
  const existingIndex = await loadExistingIndex();

  // Step 6: Determine which repos need scanning
  const reposToScan = getReposToScan(reposToProcess, existingIndex);

  if (reposToScan.length === 0) {
    console.log('\n✅ All repositories are up to date!');
    console.log('   Use --full flag to force a complete rescan\n');
    return;
  }

  // Step 7: Initialize scanner
  console.log('\n🔧 Initializing scanner...');
  await initScanner();

  // Step 8: Process each repository
  console.log('\n📊 Scanning repositories...\n');

  let privateIndex = 1;
  const processedRepos = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < reposToScan.length; i++) {
    const repo = reposToScan[i];
    const progress = `[${i + 1}/${reposToScan.length}]`;

    // Generate repo ID
    const repoId = generateRepoId(repo, privateIndex);
    if (repo.private) privateIndex++;

    // Anonymize if private
    const metadata = anonymizePrivateRepo(repo, privateIndex - 1);

    console.log(`${progress} ${metadata.name} (${repo.language || 'Unknown'})`);

    // Scan repository
    const metrics = await scanRepository(repo, metadata, repoId, process.env.GITHUB_TOKEN);

    if (metrics) {
      // Save individual repo JSON
      const repoFilePath = join(reposDir, `${repoId}.json`);
      await fs.writeFile(repoFilePath, JSON.stringify(metrics, null, 2));

      processedRepos.push(metrics);
      successCount++;
    } else {
      console.log(`   ⚠️  Skipped (scan failed)\n`);
      failCount++;
    }
  }

  // Step 9: Cleanup scanner
  console.log('🧹 Cleaning up...');
  await cleanupScanner();

  console.log('\n✅ Scanning complete!');
  console.log(`   Successful: ${successCount} repos`);
  console.log(`   Failed: ${failCount} repos`);
  console.log(`   Public: ${processedRepos.filter(r => !r.metadata.isPrivate).length}`);
  console.log(`   Private: ${processedRepos.filter(r => r.metadata.isPrivate).length}`);

  // Step 10: Generate master index
  console.log('\n📝 Generating master index...');
  await generateMasterIndex(processedRepos, existingIndex);

  console.log('\n🎉 All done!');
  console.log(`   Metrics saved to: ${metricsDir}`);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

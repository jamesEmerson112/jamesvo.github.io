# GitHub Actions Automation

This repository uses GitHub Actions to automatically scan and update portfolio metrics.

## 📋 Workflows

### 1. **Scan Repository Metrics** (`scan-metrics.yml`)

Automatically scans your GitHub repositories and calculates development metrics.

**Triggers:**
- 🗓️ **Weekly** (Monday 2 AM UTC): Incremental scan (only updated repos)
- 🗓️ **Monthly** (1st of month, 3 AM UTC): Full scan (all repos)
- 🎯 **Manual**: Workflow dispatch with optional full scan

**What it does:**
1. Installs SCC (code counter)
2. Scans repositories using your GitHub token
3. Calculates COCOMO metrics (traditional + AI-adjusted)
4. Commits updated JSON files to `public/metrics/`
5. Triggers deployment workflow automatically

### 2. **Deploy to GitHub Pages** (`deploy.yml`)

Builds and deploys the Svelte portfolio site.

**Triggers:**
- Automatically when `scan-metrics.yml` commits changes
- Manually via workflow dispatch
- On push to `main` branch

---

## 🚀 Manual Trigger Guide

### Running a Scan Manually

1. Go to **Actions** tab in GitHub
2. Select **"Scan Repository Metrics"** workflow
3. Click **"Run workflow"**
4. Options:
   - ✅ **Force full scan**: Check to scan all 173 repos (~30-45 min)
   - ⬜ **Incremental scan**: Leave unchecked to only scan updated repos (~5-10 min)
5. Click **"Run workflow"**

The workflow will:
- Scan repositories
- Update metrics JSONs
- Commit changes
- Auto-trigger deployment

---

## 📊 Workflow Output

### Metrics Files Generated

```
public/metrics/
├── index.json              # Master index with totals
└── repos/
    ├── repo-001.json       # Individual repo metrics
    ├── repo-002.json
    └── ...                 # One file per repository
```

### JSON Structure

Each file contains:
- **Metadata** (name, description, language)
- **Raw SCC data** (lines per language)
- **Computed metrics**:
  - Summary statistics
  - Language percentages
  - **Traditional COCOMO** estimates
  - **AI-adjusted COCOMO** estimates (~4x faster)
  - Comparison stats (75% cost reduction)

---

## 🔧 Configuration

### Environment Variables

The workflow uses:
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions
- No additional secrets needed!

### Schedule Customization

To change the scan schedule, edit `.github/workflows/scan-metrics.yml`:

```yaml
schedule:
  # Change timing as needed
  - cron: '0 2 * * 1'    # Weekly (Monday 2 AM UTC)
  - cron: '0 3 1 * *'    # Monthly (1st at 3 AM UTC)
```

**Cron syntax:**
- `0 2 * * 1` = Every Monday at 2 AM UTC
- `0 3 1 * *` = 1st of every month at 3 AM UTC

**Time zone note:** GitHub Actions uses UTC. Convert to your local time:
- 2 AM UTC = 7 PM PST (previous day)
- 3 AM UTC = 8 PM PST (previous day)

---

## 🐛 Troubleshooting

### Scan Failed

**Check:**
1. Go to Actions tab
2. Click on failed workflow run
3. Expand failed step to see error

**Common issues:**
- SCC installation failed → Temporary network issue, re-run workflow
- Git push failed → Check repository permissions
- Scan timed out → Too many repos, use incremental scan

### No Changes Committed

This is normal! It means:
- No repositories were updated since last scan
- Metrics are already up-to-date

### Workflow Not Triggering

**Scheduled runs:**
- Check that workflow file is on `main` branch
- Scheduled workflows may have 5-15 min delay

**Manual trigger not visible:**
- Ensure you have push access to the repository

---

## 📈 Monitoring

### View Scan Results

1. Go to **Actions** tab
2. Click on **"Scan Repository Metrics"** workflow
3. Click on latest run
4. View **Summary** for:
   - Scan type (full vs incremental)
   - Number of repos scanned
   - Whether changes were committed

### View Deployment

After scan completes:
1. **"Deploy to GitHub Pages"** workflow auto-triggers
2. Site updates with new metrics in ~2-3 minutes
3. Visit your portfolio to see updated stats!

---

## 🎯 Best Practices

### When to Use Full Scan

✅ **Use full scan when:**
- First time running workflow
- Changed scan logic or calculations
- Suspect data inconsistencies
- Monthly scheduled run (automatic)

⚠️ **Avoid full scan when:**
- Just checking recent changes
- Testing the workflow
- Want quick results

**Tip:** Incremental scans are 5-10x faster!

### Scan Frequency Recommendations

- **Weekly incremental**: Perfect for regular updates
- **Monthly full**: Ensures all data stays fresh
- **Manual**: Use as needed for specific updates

---

## 💡 Tips

1. **First-time setup:** Run a full scan manually to populate all data
2. **Quick updates:** Use incremental scan for recent changes
3. **Monitor logs:** Check Action runs to see which repos were scanned
4. **Commit messages:** Auto-generated messages indicate scan type
5. **Deploy time:** Allow 2-3 minutes for deployment after scan

---

## 🔗 Related Documentation

- [PORTFOLIO-METRICS-PLAN.md](./PORTFOLIO-METRICS-PLAN.md) - Full system architecture
- [GITHUB-TOKEN-SETUP.md](./GITHUB-TOKEN-SETUP.md) - Local development setup
- [DASHBOARD-README.md](./DASHBOARD-README.md) - Dashboard features

---

## 📝 Workflow Diagram

```
┌─────────────────────────────────────────┐
│   Weekly/Monthly Schedule               │
│   OR Manual Trigger                     │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   scan-metrics.yml                      │
├─────────────────────────────────────────┤
│  1. Install SCC                         │
│  2. Scan repositories                   │
│  3. Calculate metrics                   │
│  4. Commit JSON files                   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   deploy.yml (auto-triggered)           │
├─────────────────────────────────────────┤
│  1. Build Svelte app                    │
│  2. Deploy to GitHub Pages              │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│   Portfolio Site Updated! 🎉            │
└─────────────────────────────────────────┘
```

---

**Last Updated:** 2025-10-01  
**Version:** 1.0.0

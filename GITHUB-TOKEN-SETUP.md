# GitHub Token Setup Guide

## 🔑 Creating Your GitHub Personal Access Token

Follow these steps to create a token for local development:

### Step 1: Go to GitHub Settings
1. Visit: https://github.com/settings/tokens
2. Or navigate: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

### Step 2: Generate New Token
1. Click **"Generate new token (classic)"**
2. Give it a descriptive name: `Portfolio Metrics Scanner`
3. Set expiration: **90 days** (or "No expiration" for convenience)

### Step 3: Select Scopes
**Required scope:**
- ✅ **`repo`** - Full control of private repositories
  - This automatically includes:
    - `repo:status` - Access commit status
    - `repo_deployment` - Access deployment status
    - `public_repo` - Access public repositories
    - `repo:invite` - Access repository invitations
    - `security_events` - Read/write security events

### Step 4: Generate and Copy Token
1. Click **"Generate token"** at the bottom
2. **⚠️ IMPORTANT:** Copy the token immediately!
3. You won't be able to see it again

The token will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 5: Add Token to .env File
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   
2. Open `.env` and paste your token:
   ```
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

3. Save the file

### Step 6: Verify Setup
Test that everything works:
```bash
npm run scan:test
```

This will:
- Verify your token works
- Fetch your repositories
- Test with 5 sample repos
- Show you what will be scanned

## ✅ You're Ready!

Once the test succeeds, you can:
- `npm run scan` - Normal incremental scan
- `npm run scan:full` - Force full scan of all repos
- `npm run scan:test` - Test with 5 repos

## 🔒 Security Notes

- ✅ `.env` is in `.gitignore` (won't be committed)
- ✅ Never share your token publicly
- ✅ Rotate tokens periodically for security
- ✅ GitHub Actions will use a different token automatically

## 🚨 If Your Token Leaks

1. Go to https://github.com/settings/tokens
2. Find your token
3. Click "Delete" or "Revoke"
4. Generate a new one

## ❓ Troubleshooting

**Error: "Bad credentials"**
- Token is incorrect or expired
- Generate a new token
- Make sure you copied it completely

**Error: "Not Found"**
- Token doesn't have `repo` scope
- Regenerate token with correct scope

**Error: "API rate limit exceeded"**
- Using unauthenticated requests
- Make sure GITHUB_TOKEN is in .env
- Check token is loaded: `echo $env:GITHUB_TOKEN` (PowerShell)

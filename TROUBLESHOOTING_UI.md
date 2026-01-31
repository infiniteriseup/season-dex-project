# UI Not Displaying - Troubleshooting Guide

## Quick Fixes

### 1. Check Dev Server is Running

```bash
# Check if server is running
npm run dev

# You should see:
# ➜  Local:   http://localhost:5174/
```

### 2. Open the Correct URL

Open your browser and go to: **http://localhost:5174/**

(Note: Port might be different if 5174 is in use - check the terminal output)

### 3. Hard Refresh Browser

- **Windows/Linux**: `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: `Cmd + Shift + R`

### 4. Clear Browser Cache

1. Open DevTools (`F12`)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### 5. Check Browser Console

1. Open DevTools (`F12`)
2. Go to Console tab
3. Look for any red error messages
4. Share the errors if you see any

## Common Issues

### Issue 1: Blank White Screen

**Symptoms**: Page loads but shows nothing

**Solutions**:
```bash
# 1. Stop the dev server (Ctrl+C)
# 2. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Restart dev server
npm run dev
```

### Issue 2: "Cannot GET /" Error

**Symptoms**: Browser shows "Cannot GET /"

**Solutions**:
```bash
# Make sure you're in the project directory
cd season-dex-project

# Start dev server
npm run dev
```

### Issue 3: JavaScript Errors in Console

**Symptoms**: Red errors in browser console

**Common Errors**:

**Error**: "Failed to resolve module specifier"
```bash
# Solution: Reinstall dependencies
npm install
```

**Error**: "Uncaught TypeError: Cannot read properties of undefined"
```bash
# Solution: Check if all context providers are wrapping the app
# This is already correct in App.tsx
```

**Error**: "Module not found"
```bash
# Solution: Check if all files exist
ls -la src/components/
ls -la src/contexts/
```

### Issue 4: CSS Not Loading

**Symptoms**: Content appears but no styling

**Solutions**:
```bash
# 1. Check if CSS files exist
ls -la src/*.css

# 2. Hard refresh browser
# Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# 3. Restart dev server
npm run dev
```

### Issue 5: Port Already in Use

**Symptoms**: "Port 5173 is in use"

**Solutions**:
```bash
# Vite automatically tries another port (5174, 5175, etc.)
# Just use the port shown in the terminal output

# Or kill the process using the port:
# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Step-by-Step Debugging

### Step 1: Verify Files Exist

```bash
# Check all required files
ls -la index.html
ls -la src/main.tsx
ls -la src/App.tsx
ls -la src/index.css
ls -la src/App.css
ls -la src/components/Header.tsx
ls -la src/components/SwapCard.tsx
ls -la src/components/LiquidityPool.tsx
ls -la src/contexts/ThemeContext.tsx
ls -la src/contexts/WalletContext.tsx
```

All files should exist. If any are missing, the project is incomplete.

### Step 2: Check TypeScript Compilation

```bash
# Build the project to check for TypeScript errors
npm run build

# If successful, you should see:
# ✓ built in X seconds
```

### Step 3: Check Browser DevTools

1. Open browser to http://localhost:5174/
2. Press `F12` to open DevTools
3. Check these tabs:

**Console Tab**:
- Look for red errors
- Look for warnings (yellow)
- Check if React is loading

**Network Tab**:
- Check if main.tsx is loading (should be 200 status)
- Check if CSS files are loading
- Look for any failed requests (red)

**Elements Tab**:
- Check if `<div id="root">` has content inside
- If empty, React isn't rendering

### Step 4: Test with Minimal App

Create a test file to verify React is working:

```bash
# Backup current App.tsx
cp src/App.tsx src/App.tsx.backup

# Create minimal test
cat > src/App.tsx << 'EOF'
function App() {
  return (
    <div style={{ padding: '20px', fontSize: '24px' }}>
      <h1>Test - If you see this, React is working!</h1>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;
EOF

# Check if this displays
# If yes, the issue is in the original App.tsx
# If no, there's a deeper issue

# Restore original
mv src/App.tsx.backup src/App.tsx
```

### Step 5: Check Environment

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check if dependencies are installed
ls -la node_modules/ | wc -l
# Should show many packages (1000+)
```

## Browser-Specific Issues

### Chrome/Edge
- Clear cache: `Ctrl+Shift+Delete`
- Disable extensions temporarily
- Try incognito mode: `Ctrl+Shift+N`

### Firefox
- Clear cache: `Ctrl+Shift+Delete`
- Disable extensions temporarily
- Try private window: `Ctrl+Shift+P`

### Safari
- Clear cache: `Cmd+Option+E`
- Disable extensions
- Try private window: `Cmd+Shift+N`

## Still Not Working?

### Collect Debug Information

```bash
# 1. Check dev server output
npm run dev
# Copy all output

# 2. Check browser console
# F12 → Console tab
# Copy all errors

# 3. Check build output
npm run build
# Copy any errors

# 4. Check system info
node --version
npm --version
uname -a  # Linux/Mac
systeminfo  # Windows
```

### Try Clean Install

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Remove everything
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm package-lock.json

# 3. Clear npm cache
npm cache clean --force

# 4. Reinstall
npm install

# 5. Try again
npm run dev
```

### Check for Port Conflicts

```bash
# Check what's using port 5174
# Linux/Mac:
lsof -i :5174

# Windows:
netstat -ano | findstr :5174

# If something else is using it, either:
# 1. Kill that process
# 2. Or specify a different port:
npm run dev -- --port 3000
```

## Expected Behavior

When working correctly, you should see:

1. **Terminal**: 
   ```
   VITE v7.3.1  ready in XXX ms
   ➜  Local:   http://localhost:5174/
   ```

2. **Browser**: 
   - Seasonal themed background
   - Header with wallet buttons
   - Swap/Liquidity tabs
   - Swap card or Liquidity pool interface
   - Seasonal animations (petals, leaves, snow, etc.)

3. **Console**: 
   - No red errors
   - Maybe some info logs (✅ messages)

## Get Help

If none of these solutions work:

1. **Check the logs**:
   ```bash
   npm run dev 2>&1 | tee dev-server.log
   ```

2. **Take screenshots**:
   - Terminal output
   - Browser console
   - Browser network tab

3. **Share information**:
   - Node version
   - npm version
   - Operating system
   - Browser and version
   - Error messages

---

**Most Common Solution**: Hard refresh the browser (`Ctrl+Shift+R`)

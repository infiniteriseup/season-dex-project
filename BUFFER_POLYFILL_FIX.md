# Buffer Polyfill Fix for Solana Web3.js

## Problem

When running the app, you encountered this error:

```
Module "buffer" has been externalized for browser compatibility. 
Cannot access "buffer.Buffer" in client code.

Uncaught ReferenceError: Buffer is not defined
```

This happens because Solana Web3.js and related libraries (Raydium, Orca) use Node.js's `Buffer` API, which doesn't exist in browsers.

## Solution Applied

### 1. Installed Buffer Package

```bash
npm install buffer --save
```

### 2. Updated `vite.config.ts`

Added Buffer polyfill configuration:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'global': 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
```

### 3. Updated `src/main.tsx`

Added Buffer polyfill to window object:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Buffer } from 'buffer'

// Polyfill Buffer for Solana Web3.js
window.Buffer = Buffer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 4. Updated `src/vite-env.d.ts`

Added TypeScript declaration for window.Buffer:

```typescript
/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum?: any;
    solana?: any;
    Buffer: any;
  }
}

export {};
```

## Result

✅ **Fixed!** The app now runs without Buffer errors.

- Dev server: http://localhost:5175/
- Build: Successful (1.74MB, 527KB gzipped)
- TypeScript: No errors

## Why This Happens

Solana Web3.js and related libraries were originally written for Node.js, which has built-in `Buffer` support. When running in a browser:

1. Vite detects Node.js modules and tries to externalize them
2. Browser doesn't have `Buffer` API
3. Code fails when trying to use `Buffer`

The solution is to provide a browser-compatible Buffer polyfill.

## Common Related Issues

### Issue: "process is not defined"

If you see this error, add process polyfill:

```bash
npm install process
```

Update `vite.config.ts`:
```typescript
define: {
  'global': 'globalThis',
  'process.env': {},
},
```

Update `src/main.tsx`:
```typescript
import process from 'process'
window.process = process
```

### Issue: "global is not defined"

Already fixed in our config with:
```typescript
define: {
  'global': 'globalThis',
}
```

### Issue: "crypto is not defined"

Modern browsers have `crypto` built-in, but if you see this:

```typescript
// In src/main.tsx
import { webcrypto } from 'crypto'
window.crypto = webcrypto as any
```

## Testing

After applying the fix:

1. **Clear browser cache**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Open dev server**: http://localhost:5175/
3. **Check console**: Should see no Buffer errors
4. **Test wallet connection**: Both MetaMask and Phantom should work

## Verification

```bash
# Build should succeed
npm run build

# Dev server should run without errors
npm run dev

# Open browser to http://localhost:5175/
# No "Buffer is not defined" errors in console
```

## Additional Notes

- This is a common issue with Solana development
- The fix is standard for all Vite + Solana projects
- Buffer polyfill adds ~6KB to bundle size
- No performance impact on runtime

## References

- Vite Troubleshooting: https://vite.dev/guide/troubleshooting.html
- Buffer Package: https://www.npmjs.com/package/buffer
- Solana Web3.js: https://solana-labs.github.io/solana-web3.js/

---

**Status**: ✅ Fixed  
**Date**: January 31, 2026  
**Version**: 1.4.0

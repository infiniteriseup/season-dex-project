# SeasonDEX Testing Guide

## Quick Start

### 1. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

### 2. Minimum Required Setup

For basic testing, you don't need any environment variables! The app works with:
- MetaMask's built-in Ethereum provider
- Public Solana RPC endpoints
- Jupiter API (no key required)

Just run:
```bash
npm run dev
```

## Environment Variables Explained

### 🔴 Required: NONE
All environment variables are optional. The app uses sensible defaults.

### 🟡 Recommended for Better Performance

#### Ethereum RPC (Optional but Recommended)

**Why?** MetaMask's provider works, but a dedicated RPC is faster and more reliable.

**Free Options:**
```bash
# Infura (10M requests/month free)
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
# Sign up: https://infura.io/

# Alchemy (300M compute units/month free)
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
# Sign up: https://www.alchemy.com/

# QuickNode (free tier available)
VITE_ETHEREUM_RPC_URL=https://your-endpoint.quiknode.pro/YOUR_KEY/
# Sign up: https://www.quicknode.com/
```

#### Solana RPC (Optional but Recommended)

**Why?** Public endpoints are rate-limited. Premium endpoints are faster.

**Free Options:**
```bash
# Public endpoint (free, rate-limited)
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Helius (free tier: 100k requests/day)
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
# Sign up: https://www.helius.dev/

# QuickNode (free tier available)
VITE_SOLANA_RPC_URL=https://your-endpoint.solana-mainnet.quiknode.pro/YOUR_KEY/
# Sign up: https://www.quicknode.com/

# Alchemy (free tier available)
VITE_SOLANA_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY
# Sign up: https://www.alchemy.com/
```

### 🟢 Optional Enhancements

#### Price Feeds
```bash
# CoinGecko (free tier: 10-50 calls/minute)
VITE_COINGECKO_API_URL=https://api.coingecko.com/api/v3
# No API key needed for free tier
```

#### Analytics
```bash
# Google Analytics
VITE_ENABLE_ANALYTICS=true
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Sentry Error Tracking
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

## Testing Scenarios

### Scenario 1: Quick Local Testing (No Setup)

**Goal**: Test the UI and basic functionality

**Setup**:
```bash
# No .env file needed!
npm run dev
```

**What Works**:
- ✅ Seasonal themes and animations
- ✅ Theme controls (season selector, day/night)
- ✅ Wallet connection (MetaMask, Phantom)
- ✅ Balance display
- ✅ UI responsiveness
- ⚠️ Swaps (requires wallet with funds)
- ⚠️ Liquidity (requires wallet with funds)

### Scenario 2: Testnet Testing (Free Test Tokens)

**Goal**: Test swaps and liquidity without real money

**Setup**:
```bash
# Create .env file
cat > .env << EOF
VITE_ENABLE_TESTNET=true
VITE_ETHEREUM_RPC_URL=https://goerli.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_ETHEREUM_CHAIN_ID=5
VITE_SOLANA_NETWORK=devnet
VITE_DEBUG_MODE=true
EOF

npm run dev
```

**Get Test Tokens**:

**Ethereum (Goerli)**:
1. Visit https://goerlifaucet.com/
2. Enter your MetaMask address
3. Receive test ETH

**Solana (Devnet)**:
1. Visit https://solfaucet.com/
2. Enter your Phantom address
3. Receive test SOL

**What to Test**:
- ✅ Connect wallets
- ✅ Check test token balances
- ✅ Execute test swaps
- ✅ Add/remove test liquidity
- ✅ Verify transactions on explorers

### Scenario 3: Mainnet Testing (Real Money - Use Caution!)

**Goal**: Test with real tokens (use small amounts!)

**Setup**:
```bash
# Create .env file
cat > .env << EOF
VITE_ENABLE_TESTNET=false
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_ETHEREUM_CHAIN_ID=1
VITE_SOLANA_NETWORK=mainnet-beta
VITE_ENABLE_TX_SIMULATION=true
VITE_DEBUG_MODE=false
EOF

npm run dev
```

**⚠️ IMPORTANT SAFETY TIPS**:
1. Start with VERY small amounts ($1-5)
2. Double-check all addresses
3. Verify transaction details before confirming
4. Test on testnet first!
5. Keep private keys secure

### Scenario 4: Production Deployment

**Goal**: Deploy to production with optimal performance

**Setup**:
```bash
# Create .env file
cat > .env << EOF
# Use premium RPC endpoints
VITE_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Production settings
VITE_ENABLE_TESTNET=false
VITE_DEBUG_MODE=false
VITE_ENABLE_TX_SIMULATION=true
VITE_ENABLE_ANALYTICS=true

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id

# Feature flags
VITE_ENABLE_SWAPS=true
VITE_ENABLE_LIQUIDITY=true
VITE_ENABLE_SEASONAL_ANIMATIONS=true
VITE_ENABLE_THEME_CONTROLS=true
EOF

# Build for production
npm run build

# Preview production build
npm run preview
```

## Testing Checklist

### ✅ Basic Functionality
- [ ] App loads without errors
- [ ] Seasonal theme displays correctly
- [ ] Season selector works (🌸☀️🍂❄️)
- [ ] Day/night toggle works (☀️/🌙)
- [ ] Auto season toggle works (🔄)
- [ ] Animations play smoothly
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Responsive design works on desktop

### ✅ Wallet Connection
- [ ] MetaMask button visible
- [ ] Phantom button visible
- [ ] MetaMask connects successfully
- [ ] Phantom connects successfully
- [ ] Balance displays correctly
- [ ] Address displays (truncated)
- [ ] Disconnect works
- [ ] Reconnect works after page refresh

### ✅ Token Swaps (Ethereum)
- [ ] Token selector opens
- [ ] Can select from token
- [ ] Can select to token
- [ ] Amount input works
- [ ] Quote updates automatically
- [ ] Swap button enables when ready
- [ ] Transaction executes
- [ ] Transaction hash displays
- [ ] Balance updates after swap

### ✅ Token Swaps (Solana)
- [ ] Token selector opens
- [ ] Can select from token
- [ ] Can select to token
- [ ] Amount input works
- [ ] Quote updates automatically
- [ ] Swap button enables when ready
- [ ] Transaction executes
- [ ] Transaction hash displays
- [ ] Balance updates after swap

### ✅ Liquidity Pools (Ethereum)
- [ ] Add liquidity tab works
- [ ] Remove liquidity tab works
- [ ] Token amount inputs work
- [ ] Balance displays correctly
- [ ] Add liquidity executes
- [ ] Remove liquidity executes
- [ ] Transaction hash displays
- [ ] Pool info displays

### ✅ Liquidity Pools (Solana)
- [ ] Add liquidity tab works
- [ ] Remove liquidity tab works
- [ ] Token amount inputs work
- [ ] Shows appropriate error message (pool config required)
- [ ] Provides guidance to users

### ✅ Error Handling
- [ ] Wallet not connected error
- [ ] Insufficient balance error
- [ ] Network error handling
- [ ] Transaction failure handling
- [ ] Clear error messages

## Common Issues & Solutions

### Issue: "MetaMask not detected"
**Solution**: 
1. Install MetaMask extension
2. Refresh the page
3. Check browser console for errors

### Issue: "Phantom not detected"
**Solution**:
1. Install Phantom extension
2. Refresh the page
3. Make sure Phantom is unlocked

### Issue: "Transaction failed"
**Solution**:
1. Check you have enough balance
2. Check you have enough for gas fees
3. Try increasing slippage tolerance
4. Check network status

### Issue: "RPC rate limit exceeded"
**Solution**:
1. Get a free API key from Infura/Alchemy
2. Add to .env file
3. Restart dev server

### Issue: "Liquidity operations not working (Solana)"
**Expected Behavior**: This is normal! Solana liquidity requires pool configuration from Raydium/Orca APIs. Users should use the official DEX websites for now.

## Performance Testing

### Load Time
```bash
# Build and measure
npm run build
npm run preview

# Check in browser DevTools:
# - Network tab: Total load time
# - Performance tab: First Contentful Paint
# - Lighthouse: Performance score
```

### Bundle Size
```bash
npm run build

# Check output:
# - dist/assets/index-*.js size
# - Gzipped size
# - Target: < 1MB gzipped
```

### Animation Performance
```bash
# In browser DevTools:
# 1. Open Performance tab
# 2. Record while changing seasons
# 3. Check FPS (target: 60fps)
# 4. Check for layout thrashing
```

## Browser Testing

### Desktop Browsers
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Opera (latest)
- [ ] Brave (latest)

### Mobile Browsers
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Screen Sizes
- [ ] 320px (small mobile)
- [ ] 375px (iPhone)
- [ ] 768px (tablet)
- [ ] 1024px (desktop)
- [ ] 1920px (large desktop)
- [ ] 2560px (4K)

## Security Testing

### Before Mainnet Use
- [ ] Test on testnet first
- [ ] Verify all contract addresses
- [ ] Check transaction details before signing
- [ ] Test with small amounts first
- [ ] Verify slippage protection works
- [ ] Test transaction simulation
- [ ] Review all error messages

### Code Review
- [ ] No hardcoded private keys
- [ ] No sensitive data in logs
- [ ] Proper input validation
- [ ] Safe math operations
- [ ] Proper error handling

## Automated Testing (Future)

```bash
# Unit tests (to be implemented)
npm run test

# E2E tests (to be implemented)
npm run test:e2e

# Type checking
npm run build  # TypeScript compilation
```

## Getting Help

### Resources
- **Documentation**: Check all .md files in project root
- **Console Logs**: Open browser DevTools → Console
- **Network Tab**: Check API calls and responses
- **React DevTools**: Inspect component state

### Debug Mode
Enable debug mode for detailed logging:
```bash
VITE_DEBUG_MODE=true npm run dev
```

### Community
- Ethereum: https://ethereum.org/community
- Solana: https://solana.com/community
- Uniswap: https://discord.gg/uniswap
- Raydium: https://discord.gg/raydium
- Orca: https://discord.gg/orca

---

**Last Updated**: January 31, 2026  
**Version**: 1.4.0  
**Status**: ✅ Ready for Testing

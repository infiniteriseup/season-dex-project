# SeasonDEX Setup & Usage Guide

## Quick Start

```bash
npm run dev
```

The app will be available at `http://localhost:5174` (or another port if 5174 is in use).

## Wallet Setup

### MetaMask (Ethereum)
1. Install MetaMask browser extension from https://metamask.io
2. Create or import a wallet
3. Click "🦊 MetaMask" button in the app to connect
4. Approve the connection request in MetaMask popup

### Phantom (Solana)
1. Install Phantom browser extension from https://phantom.app
2. Create or import a wallet
3. Click "👻 Phantom" button in the app to connect
4. Approve the connection request in Phantom popup

## Features Overview

### 1. Seasonal Theming & Animations
- The UI automatically changes based on the current season
- Professional animations for each season (cherry blossoms, sun rays, falling leaves, snowflakes)
- Day/night mode with different color palettes and animations
- Manual season preview with theme controls

**Season Controls:**
- Click season icons (🌸☀️🍂❄️) to preview any season
- Click 🔄 to return to automatic season detection
- Click ☀️/🌙 to toggle between day and night modes
- Controls are located in the header next to wallet buttons

**Current Season Logic:**
- Spring: March 20 - June 20
- Summer: June 21 - September 22
- Fall: September 23 - December 20
- Winter: December 21 - March 19

### 2. Token Swapping (Smart Contract Integrated)
- **Ethereum (MetaMask)**: Real swaps via Uniswap V2 Router
- **Solana (Phantom)**: Real swaps via Jupiter Aggregator
- Live price quotes that update automatically (500ms debounce)
- Transaction execution with wallet confirmation
- Transaction hash display after successful swap
- Balance checking and validation

**How to Swap:**
1. Connect your wallet (MetaMask or Phantom)
2. Select tokens from dropdown menus
3. Enter amount to swap
4. Review live quote and estimated fees
5. Click "Swap" button
6. Confirm transaction in your wallet
7. Wait for confirmation and view transaction hash

### 3. Liquidity Pools
- **Ethereum**: Full add/remove liquidity via Uniswap V2
- **Solana**: UI ready (requires Raydium/Orca SDK for operations)
- View your pool share and APY
- Track pool tokens and earnings
- Slider-based percentage selection for removing liquidity

### 4. Responsive Design
- Fully responsive on all devices (mobile, tablet, desktop)
- Mobile hamburger menu for navigation
- Touch-optimized buttons (44px minimum)
- Fluid typography that scales with viewport
- Breakpoints: Small Mobile (<480px), Mobile (<768px), Tablet (768-1023px), Desktop (1024-1919px), Large Desktop (1920px+)

## Next Steps for Production

### 1. Solana Liquidity Operations
Currently, Solana liquidity operations show a placeholder message. To implement:

```typescript
// Example: Integrate with Raydium SDK
import { Liquidity } from '@raydium-io/raydium-sdk';

// Add liquidity to Raydium pool
const { transaction } = await Liquidity.makeAddLiquidityTransaction({
  connection,
  poolKeys,
  userKeys,
  amountInA,
  amountInB,
});

await wallet.sendTransaction(transaction, connection);
```

### 2. Token List Management
- Add support for custom token lists (e.g., Token Lists standard)
- Implement token search and filtering
- Display token logos and metadata
- Add popular token presets
- Token whitelist/blacklist for security

### 3. Price Charts & Analytics
- Integrate with price feed APIs (CoinGecko, CoinMarketCap)
- Display real-time token prices
- Calculate and show price impact
- Show historical price charts
- Display 24h volume and market cap

### 4. Transaction Management
- Enhanced transaction confirmation modals
- Real-time pending transaction status
- Complete transaction history with filtering
- Transaction retry logic for failed transactions
- Gas price estimation and customization

### 5. Security Enhancements
- Enhanced input validation and sanitization
- Rate limiting for API calls
- Transaction simulation before execution
- Security warnings for unknown/unverified tokens
- Phishing protection and domain verification

## Development Tips

### Testing Wallets
- Use testnets for development (Goerli, Sepolia for Ethereum; Devnet for Solana)
- Get test tokens from faucets
- Test all wallet connection scenarios

### Debugging
```bash
# Check for TypeScript errors
npm run build

# Run linter
npm run lint
```

### Environment Variables
Create `.env` file for configuration:
```env
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Browser Compatibility

- Chrome/Brave: Full support
- Firefox: Full support
- Safari: Limited wallet support
- Edge: Full support

## Troubleshooting

### MetaMask not connecting
- Ensure MetaMask is installed and unlocked
- Check if site is allowed in MetaMask settings
- Try refreshing the page

### Phantom not connecting
- Ensure Phantom is installed and unlocked
- Check browser console for errors
- Verify Solana network is accessible

### Theme not updating
- Check browser console for errors
- Verify date/time is correct on your system
- Clear browser cache and reload
- Try manually selecting a season with theme controls

### Animations not showing
- Ensure JavaScript is enabled
- Check if browser supports CSS animations
- Try toggling between seasons to refresh animations
- Clear browser cache

## Performance Optimization

- Lazy load components
- Implement virtual scrolling for token lists
- Cache token metadata
- Optimize re-renders with React.memo
- Use Web Workers for heavy calculations

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel, Netlify, or any static host
# Upload the 'dist' folder
```

## Support & Resources

- React Documentation: https://react.dev
- ethers.js Documentation: https://docs.ethers.org
- Solana Web3.js: https://solana-labs.github.io/solana-web3.js
- Vite Documentation: https://vitejs.dev
- Uniswap V2 Docs: https://docs.uniswap.org/contracts/v2/overview
- Jupiter Aggregator: https://docs.jup.ag

## Additional Documentation

- `README.md` - Complete project documentation
- `PROJECT_OVERVIEW.md` - Technical overview and architecture
- `QUICK_START.md` - Quick start guide
- `SMART_CONTRACT_INTEGRATION.md` - Smart contract integration details
- `SEASONAL_ANIMATIONS_GUIDE.md` - Animation system documentation
- `SWAP_GUIDE.md` - Token swap instructions
- `THEME_FEATURES_SUMMARY.md` - Theme features overview
- `CROSS_PLATFORM_GUIDE.md` - Cross-platform compatibility guide

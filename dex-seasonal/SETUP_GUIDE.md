# SeasonDEX Setup & Usage Guide

## Quick Start

```bash
cd dex-seasonal
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

### 1. Seasonal Theming
- The UI automatically changes based on the current season
- Themes update every hour to catch season transitions
- Manual theme switching can be added if needed

**Current Season Logic:**
- Spring: March 20 - June 20
- Summer: June 21 - September 22
- Fall: September 23 - December 20
- Winter: December 21 - March 19

### 2. Token Swapping
- Select tokens from dropdown menus
- Enter amount to swap
- Click swap button to execute (currently shows alert, needs smart contract integration)
- View estimated network fees and slippage

### 3. Liquidity Pools
- Add liquidity by providing two tokens
- Remove liquidity using the slider
- View your pool share and APY
- Track pool tokens and earnings

## Next Steps for Production

### 1. Smart Contract Integration

#### For Ethereum (MetaMask):
```typescript
// Example: Integrate with Uniswap V2 Router
import { Contract } from 'ethers';

const UNISWAP_V2_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const routerABI = [...]; // Uniswap V2 Router ABI

const router = new Contract(UNISWAP_V2_ROUTER, routerABI, signer);
await router.swapExactTokensForTokens(
  amountIn,
  amountOutMin,
  [tokenA, tokenB],
  recipient,
  deadline
);
```

#### For Solana (Phantom):
```typescript
// Example: Integrate with Jupiter Aggregator
import { Jupiter } from '@jup-ag/core';

const jupiter = await Jupiter.load({
  connection,
  cluster: 'mainnet-beta',
  user: wallet.publicKey,
});

const routes = await jupiter.computeRoutes({
  inputMint: tokenA,
  outputMint: tokenB,
  amount: inputAmount,
  slippage: 1,
});

const { execute } = await jupiter.exchange({ routeInfo: routes.routesInfos[0] });
await execute();
```

### 2. Token List Management
- Add support for custom token lists
- Implement token search and filtering
- Display token logos and metadata
- Add popular token presets

### 3. Price Feeds
- Integrate with Chainlink or other oracles
- Display real-time token prices
- Calculate price impact
- Show historical price charts

### 4. Transaction Management
- Add transaction confirmation modals
- Show pending transaction status
- Display transaction history
- Implement transaction retry logic

### 5. Security Enhancements
- Add input validation
- Implement rate limiting
- Add transaction simulation before execution
- Display security warnings for unknown tokens

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

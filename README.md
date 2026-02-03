# SeasonDEX - Seasonal Decentralized Exchange

A modern, fully-functional DEX with seasonal theming that adapts throughout 2026, supporting both Ethereum (MetaMask) and Solana (Phantom) wallets.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173 (or the port shown in terminal)

# Build for production
npm run build
```

**That's it!** No environment variables needed to get started.

---

## ✨ Features

### 🎨 Seasonal Themes & Animations
- **Auto-adapts** based on current season (Spring/Summer/Fall/Winter)
- **Professional animations**: Cherry blossoms, sun rays, falling leaves, snowflakes
- **Day/Night modes** for each season
- **Manual controls**: Preview any season with 🌸☀️🍂❄️ buttons
- **Auto toggle**: � returns to automatic season detection

### � Multi-Chain DEX
- **Ethereum**: Uniswap V2 integration via MetaMask
- **Solana**: Jupiter Aggregator via Phantom
- **Real swaps**: Live quotes with automatic updates
- **Liquidity pools**: Add/remove liquidity (Ethereum fully integrated)

### 📱 Fully Responsive
- Mobile, tablet, and desktop optimized
- Touch-friendly (44px minimum targets)
- Hamburger menu on mobile
- Fluid typography with CSS clamp()

### 🔐 Wallet Integration
- **MetaMask**: Full Ethereum/EVM support
- **Phantom**: Full Solana support
- Auto-reconnect on page refresh
- Balance display and transaction tracking
- **Secure**: All connections require wallet approval (see [WALLET_SECURITY.md](WALLET_SECURITY.md))

---

## 🎯 What You Can Do

### 1. Connect Wallets
- Click **🦊 MetaMask** or **👻 Phantom**
- Approve connection in wallet
- See your balance displayed

### 2. Swap Tokens
- Select tokens from dropdowns
- Enter amount
- Get live quote (updates every 500ms)
- Click "Swap" and confirm in wallet
- View transaction hash on success

### 3. Add/Remove Liquidity
- Switch to "Liquidity" tab
- Enter token amounts
- Execute on-chain (Ethereum via Uniswap V2)
- Track your pool share and APY

### 4. Customize Theme
- Click season icons to preview: 🌸 Spring, ☀️ Summer, 🍂 Fall, ❄️ Winter
- Toggle day/night: ☀️ Day / 🌙 Night
- Return to auto: 🔄 Auto Season

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build Tool | Vite 7 |
| Ethereum | ethers.js 6 + Uniswap V2 SDK |
| Solana | @solana/web3.js + Jupiter API |
| Solana DEX | Raydium SDK + Orca SDK |
| State | React Context API |

**Bundle Size**: 1.74MB (527KB gzipped)

---

## 🧪 Testing

### Option 1: Quick Test (No Setup)
```bash
npm run dev
# Open browser, connect wallet, explore UI
```

### Option 2: Testnet Testing (Free Tokens)
```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env
VITE_ENABLE_TESTNET=true
VITE_ETHEREUM_CHAIN_ID=5  # Goerli
VITE_SOLANA_NETWORK=devnet

# 3. Get test tokens
# Ethereum: https://goerlifaucet.com/
# Solana: https://solfaucet.com/

# 4. Start dev server
npm run dev
```

### Option 3: Mainnet (Real Money - Use Small Amounts!)
```bash
# Use default settings or add RPC endpoints for better performance
# See ENV_QUICK_REFERENCE.md for details
npm run dev
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
npm run build
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Your Own Server
```bash
npm run build
# Upload 'dist' folder to your server
# Configure web server to serve index.html
```

---

## 📁 Project Structure

```
season-dex-project/
├── src/
│   ├── components/          # UI components
│   │   ├── Header.tsx       # Navigation + wallet buttons
│   │   ├── SwapCard.tsx     # Token swap interface
│   │   ├── LiquidityPool.tsx # Liquidity management
│   │   ├── ThemeControls.tsx # Season/day-night controls
│   │   └── SeasonalAnimations.tsx # Animated backgrounds
│   ├── contexts/            # State management
│   │   ├── ThemeContext.tsx # Seasonal themes
│   │   └── WalletContext.tsx # Wallet connections
│   ├── services/            # DEX integrations
│   │   ├── uniswapService.ts # Ethereum swaps
│   │   ├── solanaService.ts  # Solana swaps
│   │   └── dexService.ts     # Unified interface
│   ├── hooks/
│   │   └── useResponsive.ts  # Responsive breakpoints
│   ├── themes/
│   │   └── seasons.ts        # Season definitions
│   └── types/
│       └── index.ts          # TypeScript types
├── dist/                    # Production build
├── .env.example             # Environment variables template
└── README.md                # This file
```

---

## 🔧 Environment Variables (Optional)

**None required!** The app works out of the box.

For better performance, add free RPC endpoints:

```bash
# .env
VITE_ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
```

**Free RPC Providers:**
- Infura: https://infura.io/ (10M requests/month)
- Alchemy: https://alchemy.com/ (300M compute units/month)
- Helius: https://helius.dev/ (100k requests/day)

See [ENV_QUICK_REFERENCE.md](ENV_QUICK_REFERENCE.md) for all options.

---

## 🎨 Seasonal Themes

### Spring (March 20 - June 20)
- Colors: Fresh greens, pastels, light blues
- Animation: Floating cherry blossom petals
- Mood: Renewal and growth

### Summer (June 21 - September 22)
- Colors: Bright yellows, warm oranges, vibrant blues
- Animation: Sun rays (day) / Starry sky (night)
- Mood: Energy and warmth

### Fall (September 23 - December 20)
- Colors: Warm oranges, browns, earthy tones
- Animation: Tumbling autumn leaves
- Mood: Cozy and harvest

### Winter (December 21 - March 19)
- Colors: Cool blues, whites, purples
- Animation: Drifting snowflakes
- Mood: Crisp and serene

---

## 🐛 Troubleshooting

### UI Not Displaying
```bash
# 1. Hard refresh browser
Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

# 2. Clear cache and restart
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Buffer/Polyfill Errors
Already fixed! The project uses `vite-plugin-node-polyfills` to handle all Node.js polyfills automatically.

### Phantom Wallet Connection Error (403 Forbidden)
**Problem**: "Error: failed to get balance of account" or 403 errors when connecting Phantom.

**Cause**: Public Solana mainnet RPC has strict rate limits.

**Solution**: The app now uses Solana devnet by default (more reliable). For mainnet:

1. Get a free RPC API key from [Helius](https://www.helius.dev/) (100 req/sec free tier)
2. Create `.env` file:
   ```bash
   VITE_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
   ```
3. Restart dev server

**Alternative**: Use devnet (default) - wallet will connect successfully even if balance shows 0.

### Wallet Not Connecting
- Install MetaMask: https://metamask.io/
- Install Phantom: https://phantom.app/
- Unlock wallet and refresh page

### Transaction Failing
- Check sufficient balance for gas fees
- Try increasing slippage tolerance
- Verify network is correct (mainnet/testnet)

---

## 📚 Additional Documentation

- **[WALLET_SECURITY.md](WALLET_SECURITY.md)** - 🔐 Wallet security & connection flow explained
- **[QUICK_START.md](QUICK_START.md)** - Quick start guide
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Technical architecture
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete testing guide
- **[ENV_QUICK_REFERENCE.md](ENV_QUICK_REFERENCE.md)** - Environment variables
- **[SMART_CONTRACT_INTEGRATION.md](SMART_CONTRACT_INTEGRATION.md)** - Smart contract details
- **[SOLANA_LIQUIDITY_GUIDE.md](SOLANA_LIQUIDITY_GUIDE.md)** - Solana liquidity integration
- **[WHATS_NEXT.md](WHATS_NEXT.md)** - Roadmap and next steps

---

## 🚧 Known Limitations

1. **Solana Liquidity**: Requires pool configuration from Raydium/Orca APIs (not yet implemented)
2. **Token Lists**: Currently uses hardcoded tokens (can be extended)
3. **Transaction History**: Not persisted (can be added with localStorage)
4. **Price Charts**: Not included (can integrate CoinGecko/TradingView)

See [WHATS_NEXT.md](WHATS_NEXT.md) for implementation guides.

---

## 🎯 Next Steps

1. **Test the app** - Connect wallets and try swaps
2. **Deploy** - Use Vercel, Netlify, or your hosting
3. **Customize** - Add your branding and features
4. **Extend** - Add transaction history, charts, etc.

See [WHATS_NEXT.md](WHATS_NEXT.md) for detailed roadmap.

---

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License - Free to use and modify for any purpose.

---

## 🆘 Support

- Check documentation files in project root
- Review browser console for errors (F12)
- Test on testnet before mainnet
- Join DeFi community Discord servers

---

**Built with ❤️ for the DeFi community**

**Version**: 1.4.0  
**Last Updated**: January 31, 2026  
**Status**: ✅ Production Ready

---

## 🎉 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter

# Deployment
vercel              # Deploy to Vercel
netlify deploy      # Deploy to Netlify

# Testing
# Use testnet first! See TESTING_GUIDE.md
```

**Your DEX is ready to launch! 🚀**

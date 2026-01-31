# SeasonDEX - Seasonal Decentralized Exchange

A modern DEX with seasonal theming that adapts throughout 2026, supporting both MetaMask (Ethereum/EVM) and Phantom (Solana) wallets.

## Features

- **Seasonal Themes**: Automatically adapts UI based on the current season (Spring, Summer, Fall, Winter)
- **Season Preview**: Toggle between all four seasons with beautiful animations
- **Day/Night Mode**: Switch between day and night modes for each season
- **Professional Animations**: 
  - Spring: Floating cherry blossom petals
  - Summer: Sun rays and rising particles (day) / Starry sky (night)
  - Fall: Tumbling autumn leaves
  - Winter: Drifting snowflakes
- **Multi-Wallet Support**: 
  - MetaMask for Ethereum and EVM-compatible chains
  - Phantom for Solana
- **Smart Contract Integration**:
  - Uniswap V2 for Ethereum token swaps
  - Jupiter Aggregator for Solana (best price routing)
  - Real-time quotes and price updates
  - Automatic token approval
- **Token Swapping**: Live token swaps with real-time quotes
- **Liquidity Pools**: Add and remove liquidity
  - Ethereum: Full Uniswap V2 integration
  - Solana: Raydium and Orca SDK integration (requires pool configuration)
- **Fully Responsive Design**: Optimized for all devices and platforms
  - 📱 Mobile (iOS, Android) - 320px to 767px
  - 📱 Tablet (iPad, Android tablets) - 768px to 1023px
  - 💻 Desktop (Windows, macOS, Linux) - 1024px to 1919px
  - 🖥️ Large Displays (4K, Ultrawide) - 1920px+
- **Cross-Platform**: Works on all major browsers (Chrome, Firefox, Safari, Edge, Opera)
- **Touch-Optimized**: 44px minimum touch targets, mobile-first design
- **Keyboard Accessible**: Full keyboard navigation support

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Inline styles with dynamic theming
- **Wallet Integration**:
  - ethers.js v6 for MetaMask/Ethereum
  - @solana/web3.js for Phantom/Solana
  - @solana/wallet-adapter for Solana wallet management
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MetaMask browser extension (for Ethereum)
- Phantom browser extension (for Solana)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd season-dex-project

# Install dependencies
npm install

# (Optional) Setup environment variables
cp .env.example .env
# Edit .env with your RPC endpoints (optional - works without it!)

# Start development server
npm run dev
```

**Note**: Environment variables are optional! The app works out of the box with default settings. See [TESTING_GUIDE.md](TESTING_GUIDE.md) for details.

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
season-dex-project/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Navigation and wallet connection
│   │   ├── SwapCard.tsx        # Token swap interface
│   │   └── LiquidityPool.tsx   # Liquidity management
│   ├── contexts/
│   │   ├── ThemeContext.tsx    # Seasonal theme management
│   │   └── WalletContext.tsx   # Wallet connection logic
│   ├── themes/
│   │   └── seasons.ts          # Season definitions and logic
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   └── App.css                 # Global styles
├── package.json
└── README.md
```

## Seasonal Themes

The DEX automatically switches themes based on the current date, with beautiful animations for each season:

- **Spring** (March 20 - June 20): Fresh greens, pastels, blooming colors
  - Animation: Floating cherry blossom petals
  - Day/Night modes available
- **Summer** (June 21 - September 22): Bright yellows, warm oranges, vibrant blues
  - Animation: Sun rays and rising particles (day) / Starry sky (night)
  - Day/Night modes available
- **Fall** (September 23 - December 20): Warm oranges, browns, cozy autumn tones
  - Animation: Tumbling autumn leaves
  - Day/Night modes available
- **Winter** (December 21 - March 19): Cool blues, whites, crisp winter colors
  - Animation: Drifting snowflakes with shimmer effect
  - Day/Night modes available

### Theme Controls

Located in the header next to wallet buttons:
- **Season Preview**: Click 🌸☀️🍂❄️ to preview any season
- **Auto Season**: Click 🔄 to enable automatic season detection
- **Day/Night**: Toggle between ☀️ Day and 🌙 Night modes

For more details, see [SEASONAL_ANIMATIONS_GUIDE.md](./SEASONAL_ANIMATIONS_GUIDE.md)

## Wallet Integration

### MetaMask (Ethereum)
- Supports all EVM-compatible chains
- Displays ETH balance and network info
- Handles account and network changes automatically

### Phantom (Solana)
- Connects to Solana mainnet-beta
- Displays SOL balance
- Handles wallet disconnection events

## Smart Contract Integration

### Ethereum (MetaMask)
- **Protocol**: Uniswap V2
- **Features**: Token swaps, Add/Remove liquidity
- **Supported Tokens**: ETH, USDC, USDT, DAI
- **Network**: Ethereum Mainnet

### Solana (Phantom)
- **Protocol**: Jupiter Aggregator (Raydium, Orca, and more)
- **Features**: Token swaps with best price routing
- **Supported Tokens**: SOL, USDC, USDT, RAY
- **Network**: Solana Mainnet-Beta

The current implementation includes full smart contract integration for token swapping. Liquidity operations are available for Ethereum. For detailed information, see [SMART_CONTRACT_INTEGRATION.md](./SMART_CONTRACT_INTEGRATION.md).

## Development Roadmap

- [x] Fully responsive design for all devices
- [x] Integrate with Uniswap V2 for Ethereum swaps
- [x] Integrate with Jupiter Aggregator for Solana swaps
- [x] Seasonal animations with day/night modes
- [x] Season preview and manual selection
- [x] Add Raydium/Orca direct integration for Solana liquidity
- [ ] Implement pool configuration fetching from DEX APIs
- [ ] Add accurate price impact calculations
- [ ] Implement dynamic token list management
- [ ] Add transaction history tracking
- [ ] Implement liquidity pool analytics
- [ ] Add multi-language support
- [ ] Mobile app version (PWA)

## Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for comprehensive testing instructions.

**Quick Start**:
```bash
# No environment variables needed for basic testing!
npm run dev

# For testnet testing (free test tokens):
cp .env.example .env
# Set VITE_ENABLE_TESTNET=true
npm run dev
```

**Get Test Tokens**:
- Ethereum (Goerli): https://goerlifaucet.com/
- Solana (Devnet): https://solfaucet.com/

## Documentation

- [README.md](README.md) - This file
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Complete testing guide with environment variables
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Technical architecture
- [SMART_CONTRACT_INTEGRATION.md](SMART_CONTRACT_INTEGRATION.md) - Smart contract details
- [SOLANA_LIQUIDITY_GUIDE.md](SOLANA_LIQUIDITY_GUIDE.md) - Solana liquidity integration
- [SEASONAL_ANIMATIONS_GUIDE.md](SEASONAL_ANIMATIONS_GUIDE.md) - Animation system
- [THEME_FEATURES_SUMMARY.md](THEME_FEATURES_SUMMARY.md) - Theme features
- [SWAP_GUIDE.md](SWAP_GUIDE.md) - Token swap instructions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

**Built with ❤️ for the DeFi community**  
**Version**: 1.4.0  
**Last Updated**: January 31, 2026

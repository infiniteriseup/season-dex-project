import { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { WalletProvider } from './contexts/WalletContext';
import { Header } from './components/Header';
import { SwapCard } from './components/SwapCard';
import { LiquidityPool } from './components/LiquidityPool';
import './App.css';

function AppContent() {
  const { theme } = useTheme();
  const [activeView, setActiveView] = useState<'swap' | 'liquidity'>('swap');

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        transition: 'all 0.5s ease',
      }}
    >
      <Header />

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 3vw, 1rem)',
          gap: 'clamp(1rem, 3vw, 2rem)',
          maxWidth: '100%',
        }}
      >
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            background: theme.cardBg,
            padding: '0.5rem',
            borderRadius: '16px',
            border: `2px solid ${theme.border}`,
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <button
            onClick={() => setActiveView('swap')}
            style={{
              flex: 1,
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 2rem)',
              background: activeView === 'swap' ? theme.gradient : 'transparent',
              color: activeView === 'swap' ? 'white' : theme.textSecondary,
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            }}
          >
            Swap
          </button>
          <button
            onClick={() => setActiveView('liquidity')}
            style={{
              flex: 1,
              padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(1rem, 3vw, 2rem)',
              background: activeView === 'liquidity' ? theme.gradient : 'transparent',
              color: activeView === 'liquidity' ? 'white' : theme.textSecondary,
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            }}
          >
            Liquidity
          </button>
        </div>

        {/* Main Content */}
        {activeView === 'swap' ? <SwapCard /> : <LiquidityPool />}

        {/* Season Info */}
        <div
          style={{
            background: theme.cardBg,
            padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem)',
            borderRadius: '16px',
            border: `2px solid ${theme.border}`,
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <h3
            style={{
              margin: '0 0 0.5rem 0',
              background: theme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'capitalize',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            }}
          >
            {theme.name} Season 2026
          </h3>
          <p style={{ margin: 0, color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            Experience the beauty of decentralized trading with seasonal themes that adapt throughout
            the year
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
          color: theme.textSecondary,
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
        }}
      >
        <p style={{ margin: '0 0 0.5rem 0' }}>
          SeasonDEX - Multi-chain DEX supporting MetaMask (Ethereum) and Phantom (Solana)
        </p>
        <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)', margin: 0 }}>
          Built with React, TypeScript, ethers.js, and Solana Web3.js
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;

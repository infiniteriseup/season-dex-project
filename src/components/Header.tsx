import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import { useResponsive } from '../hooks/useResponsive';
import { ThemeControls } from './ThemeControls';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const { wallet, connectMetaMask, connectPhantom, disconnect, isConnecting } = useWallet();
  const { isMobile, isSmallMobile } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when switching to desktop
  React.useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header
      style={{
        background: theme.cardBg,
        borderBottom: `2px solid ${theme.border}`,
        padding: '1rem clamp(1rem, 5vw, 2rem)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', flex: '1 1 auto' }}>
        <h1
          style={{
            color: theme.text,
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 'bold',
            margin: 0,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          SeasonDEX
        </h1>
        <span
          style={{
            color: theme.text,
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
            textTransform: 'capitalize',
            padding: '0.25rem 0.75rem',
            background: theme.primary + '30',
            borderRadius: '12px',
            whiteSpace: 'nowrap',
            display: isSmallMobile ? 'none' : 'inline',
            fontWeight: '600',
          }}
        >
          {theme.name} 2026
        </span>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: isMobile ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem',
          background: theme.primary + '20',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1.5rem',
          color: theme.text,
        }}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      <div style={{ 
        display: isMobile ? (mobileMenuOpen ? 'flex' : 'none') : 'flex',
        gap: '0.75rem', 
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        width: isMobile ? '100%' : 'auto',
        position: isMobile ? 'absolute' : 'relative',
        top: isMobile ? '100%' : 'auto',
        left: isMobile ? '0' : 'auto',
        right: isMobile ? '0' : 'auto',
        background: isMobile ? theme.cardBg : 'transparent',
        padding: isMobile ? '1rem' : '0',
        borderTop: isMobile ? `1px solid ${theme.border}` : 'none',
        zIndex: 1000,
      }}>
        {/* Theme Controls - Show on desktop only or at top of mobile menu */}
        {!isMobile && <ThemeControls />}
        
        {wallet.connected ? (
          <>
            <div
              style={{
                padding: '0.5rem 1rem',
                background: theme.primary + '20',
                borderRadius: '12px',
                color: theme.text,
                fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {wallet.walletType === 'metamask' ? '🦊 MetaMask' : '👻 Phantom'}
              </div>
              <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>
                {formatAddress(wallet.address!)} | {parseFloat(wallet.balance!).toFixed(4)}{' '}
                {wallet.walletType === 'metamask' ? 'ETH' : 'SOL'}
              </div>
            </div>
            <button
              onClick={() => {
                disconnect();
                setMobileMenuOpen(false);
              }}
              style={{
                padding: '0.75rem 1.5rem',
                background: theme.accent,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                width: isMobile ? '100%' : 'auto',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            {/* Theme Controls on mobile - show at top */}
            {isMobile && (
              <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                <ThemeControls />
              </div>
            )}
            
            <button
              onClick={() => {
                connectMetaMask();
                setMobileMenuOpen(false);
              }}
              disabled={isConnecting}
              style={{
                padding: '0.75rem 1.5rem',
                background: theme.primary,
                color: theme.text,
                border: 'none',
                borderRadius: '12px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                opacity: isConnecting ? 0.6 : 1,
                width: isMobile ? '100%' : 'auto',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              }}
              onMouseOver={(e) => !isConnecting && (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              🦊 MetaMask
            </button>
            <button
              onClick={() => {
                connectPhantom();
                setMobileMenuOpen(false);
              }}
              disabled={isConnecting}
              style={{
                padding: '0.75rem 1.5rem',
                background: theme.secondary,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
                opacity: isConnecting ? 0.6 : 1,
                width: isMobile ? '100%' : 'auto',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)',
              }}
              onMouseOver={(e) => !isConnecting && (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              👻 Phantom
            </button>
          </>
        )}
      </div>
    </header>
  );
};

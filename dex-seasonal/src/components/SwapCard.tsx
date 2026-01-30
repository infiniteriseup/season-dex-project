import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';

export const SwapCard: React.FC = () => {
  const { theme } = useTheme();
  const { wallet } = useWallet();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');

  const handleSwap = () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }
    alert('Swap functionality will be integrated with smart contracts');
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div
      style={{
        background: theme.cardBg,
        borderRadius: '24px',
        padding: 'clamp(1rem, 4vw, 2rem)',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${theme.border}`,
      }}
    >
      <h2 style={{ color: theme.text, marginTop: 0, marginBottom: '1.5rem', fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>Swap Tokens</h2>

      {/* From Token */}
      <div
        style={{
          background: theme.primary + '15',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>From</span>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
            Balance: {wallet.connected ? wallet.balance?.slice(0, 8) : '0.00'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            style={{
              flex: '1 1 150px',
              minWidth: '0',
              background: 'transparent',
              border: 'none',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: theme.text,
              outline: 'none',
            }}
          />
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: theme.primary,
              color: theme.text,
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
      </div>

      {/* Switch Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
        <button
          onClick={switchTokens}
          style={{
            background: theme.accent,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'rotate(180deg)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'rotate(0deg)')}
        >
          ⇅
        </button>
      </div>

      {/* To Token */}
      <div
        style={{
          background: theme.secondary + '15',
          borderRadius: '16px',
          padding: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>To</span>
          <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Balance: 0.00</span>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={toAmount}
            onChange={(e) => setToAmount(e.target.value)}
            placeholder="0.0"
            style={{
              flex: '1 1 150px',
              minWidth: '0',
              background: 'transparent',
              border: 'none',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              color: theme.text,
              outline: 'none',
            }}
          />
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              background: theme.secondary,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!wallet.connected || !fromAmount}
        style={{
          width: '100%',
          padding: 'clamp(0.85rem, 3vw, 1rem)',
          background: wallet.connected && fromAmount ? theme.gradient : theme.border,
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: 'clamp(1rem, 3vw, 1.1rem)',
          fontWeight: 'bold',
          cursor: wallet.connected && fromAmount ? 'pointer' : 'not-allowed',
          transition: 'transform 0.2s',
        }}
        onMouseOver={(e) =>
          wallet.connected && fromAmount && (e.currentTarget.style.transform = 'scale(1.02)')
        }
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {!wallet.connected ? 'Connect Wallet' : !fromAmount ? 'Enter Amount' : 'Swap'}
      </button>

      {/* Info */}
      <div
        style={{
          marginTop: '1rem',
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          background: theme.primary + '10',
          borderRadius: '12px',
          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
          color: theme.textSecondary,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Slippage Tolerance</span>
          <span style={{ fontWeight: 'bold' }}>0.5%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Network Fee</span>
          <span style={{ fontWeight: 'bold' }}>~$2.50</span>
        </div>
      </div>
    </div>
  );
};

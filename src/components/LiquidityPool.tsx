import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';

export const LiquidityPool: React.FC = () => {
  const { theme } = useTheme();
  const { wallet, dexService } = useWallet();
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const [loading, setLoading] = useState(false);
  const [removePercentage, setRemovePercentage] = useState(50);

  const handleAddLiquidity = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!token1Amount || !token2Amount) {
      alert('Please enter amounts for both tokens');
      return;
    }

    if (!dexService) {
      alert('DEX service not initialized');
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, using common token addresses
      // In production, these would be selected by the user
      const tokenA = wallet.walletType === 'metamask' 
        ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // WETH
        : 'So11111111111111111111111111111111111111112'; // SOL
      
      const tokenB = wallet.walletType === 'metamask'
        ? '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // USDC on Ethereum
        : 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC on Solana

      const result = await dexService.addLiquidity(
        tokenA,
        tokenB,
        token1Amount,
        token2Amount,
        0.5, // 0.5% slippage
        wallet.address || ''
      );

      if (result.success) {
        alert(`Liquidity added successfully!\nTransaction: ${result.txHash}`);
        setToken1Amount('');
        setToken2Amount('');
      } else {
        alert(`Failed to add liquidity: ${result.error}`);
      }
    } catch (error) {
      console.error('Add liquidity error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async () => {
    if (!wallet.connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!dexService) {
      alert('DEX service not initialized');
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, using a placeholder pool address
      // In production, this would be fetched from the user's liquidity positions
      const poolAddress = wallet.walletType === 'metamask'
        ? '0x0000000000000000000000000000000000000000' // Placeholder
        : '11111111111111111111111111111111'; // Placeholder

      const liquidityAmount = '0'; // Would be calculated based on percentage

      const result = await dexService.removeLiquidity(
        poolAddress,
        liquidityAmount,
        0.5, // 0.5% slippage
        wallet.address || ''
      );

      if (result.success) {
        alert(`Liquidity removed successfully!\nTransaction: ${result.txHash}`);
      } else {
        alert(`Failed to remove liquidity: ${result.error}`);
      }
    } catch (error) {
      console.error('Remove liquidity error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
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
      <h2 style={{ color: theme.text, marginTop: 0, marginBottom: '1.5rem', fontSize: 'clamp(1.3rem, 4vw, 1.75rem)' }}>Liquidity Pool</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: '1.5rem' }}>
        <button
          onClick={() => setActiveTab('add')}
          style={{
            flex: 1,
            padding: 'clamp(0.5rem, 2vw, 0.75rem)',
            background: activeTab === 'add' ? theme.gradient : theme.border + '40',
            color: activeTab === 'add' ? 'white' : theme.textSecondary,
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          }}
        >
          Add Liquidity
        </button>
        <button
          onClick={() => setActiveTab('remove')}
          style={{
            flex: 1,
            padding: 'clamp(0.5rem, 2vw, 0.75rem)',
            background: activeTab === 'remove' ? theme.gradient : theme.border + '40',
            color: activeTab === 'remove' ? 'white' : theme.textSecondary,
            border: 'none',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          }}
        >
          Remove Liquidity
        </button>
      </div>

      {activeTab === 'add' ? (
        <>
          {/* Token 1 Input */}
          <div
            style={{
              background: theme.primary + '15',
              borderRadius: '16px',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Token 1</span>
              <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>
                Balance: {wallet.connected ? wallet.balance?.slice(0, 8) : '0.00'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="number"
                value={token1Amount}
                onChange={(e) => setToken1Amount(e.target.value)}
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
              <div
                style={{
                  padding: '0.5rem 1rem',
                  background: theme.primary,
                  color: theme.text,
                  borderRadius: '12px',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 'bold',
                }}
              >
                ETH
              </div>
            </div>
          </div>

          {/* Plus Icon */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
            <div
              style={{
                background: theme.accent,
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              +
            </div>
          </div>

          {/* Token 2 Input */}
          <div
            style={{
              background: theme.secondary + '15',
              borderRadius: '16px',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Token 2</span>
              <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Balance: 0.00</span>
            </div>
            <div style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="number"
                value={token2Amount}
                onChange={(e) => setToken2Amount(e.target.value)}
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
              <div
                style={{
                  padding: '0.5rem 1rem',
                  background: theme.secondary,
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  fontWeight: 'bold',
                }}
              >
                USDC
              </div>
            </div>
          </div>

          <button
            onClick={handleAddLiquidity}
            disabled={!wallet.connected || !token1Amount || !token2Amount || loading}
            style={{
              width: '100%',
              padding: 'clamp(0.85rem, 3vw, 1rem)',
              background:
                wallet.connected && token1Amount && token2Amount && !loading ? theme.gradient : theme.border,
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: 'bold',
              cursor:
                wallet.connected && token1Amount && token2Amount && !loading ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? 'Processing...'
              : !wallet.connected
              ? 'Connect Wallet'
              : !token1Amount || !token2Amount
              ? 'Enter Amounts'
              : 'Add Liquidity'}
          </button>
        </>
      ) : (
        <>
          {/* Remove Liquidity */}
          <div
            style={{
              background: theme.primary + '15',
              borderRadius: '16px',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>Amount to Remove</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={removePercentage}
              onChange={(e) => setRemovePercentage(parseInt(e.target.value))}
              style={{
                width: '100%',
                marginBottom: '1rem',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                color: theme.textSecondary,
              }}
            >
              <span>0%</span>
              <span style={{ fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: theme.text }}>{removePercentage}%</span>
              <span>100%</span>
            </div>
          </div>

          <div
            style={{
              background: theme.secondary + '15',
              borderRadius: '16px',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ color: theme.textSecondary, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', marginBottom: '0.5rem' }}>
              You will receive:
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ color: theme.text, fontWeight: 'bold', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>0.00 ETH</span>
              <span style={{ color: theme.text, fontWeight: 'bold', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>0.00 USDC</span>
            </div>
          </div>

          <button
            onClick={handleRemoveLiquidity}
            disabled={!wallet.connected || loading}
            style={{
              width: '100%',
              padding: 'clamp(0.85rem, 3vw, 1rem)',
              background: wallet.connected && !loading ? theme.gradient : theme.border,
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: 'clamp(1rem, 3vw, 1.1rem)',
              fontWeight: 'bold',
              cursor: wallet.connected && !loading ? 'pointer' : 'not-allowed',
              transition: 'transform 0.2s',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Processing...' : !wallet.connected ? 'Connect Wallet' : 'Remove Liquidity'}
          </button>
        </>
      )}

      {/* Pool Info */}
      <div
        style={{
          marginTop: '1.5rem',
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          background: theme.primary + '10',
          borderRadius: '12px',
          fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
          color: theme.textSecondary,
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: theme.text }}>
          Your Pool Share
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span>Pool Tokens</span>
          <span style={{ fontWeight: 'bold' }}>0.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span>Share of Pool</span>
          <span style={{ fontWeight: 'bold' }}>0%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>APY</span>
          <span style={{ fontWeight: 'bold', color: theme.accent }}>12.5%</span>
        </div>
      </div>
    </div>
  );
};

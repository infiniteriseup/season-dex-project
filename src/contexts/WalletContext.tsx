import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import type { WalletState } from '../types';
import { dexService } from '../services/dexService';

interface WalletContextType {
  wallet: WalletState;
  connectMetaMask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  dexService: typeof dexService;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialWalletState: WalletState = {
  address: null,
  chainId: null,
  balance: null,
  connected: false,
  walletType: null,
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>(initialWalletState);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask is not installed. Please install it to continue.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);

      // Initialize DEX service for Ethereum
      await dexService.initializeEthereum(provider);

      setWallet({
        address: accounts[0],
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        connected: true,
        walletType: 'metamask',
      });

      console.log('✅ MetaMask connected and DEX service initialized');
    } catch (error) {
      console.error('MetaMask connection error:', error);
      alert('Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const connectPhantom = async () => {
    setIsConnecting(true);
    try {
      const { solana } = window as any;
      
      if (!solana?.isPhantom) {
        alert('Phantom wallet is not installed. Please install it to continue.');
        return;
      }

      const response = await solana.connect();
      const publicKey = response.publicKey.toString();
      
      const connection = new Connection(clusterApiUrl('mainnet-beta'));
      const balance = await connection.getBalance(new PublicKey(publicKey));

      // Initialize DEX service for Solana
      dexService.initializeSolana(clusterApiUrl('mainnet-beta'));

      setWallet({
        address: publicKey,
        chainId: null,
        balance: (balance / 1e9).toString(),
        connected: true,
        walletType: 'phantom',
      });

      console.log('✅ Phantom connected and DEX service initialized');
    } catch (error) {
      console.error('Phantom connection error:', error);
      alert('Failed to connect to Phantom');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setWallet(initialWalletState);
    console.log('🔌 Wallet disconnected');
  };

  useEffect(() => {
    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (wallet.walletType === 'metamask') {
          connectMetaMask();
        }
      });

      window.ethereum.on('chainChanged', () => {
        if (wallet.walletType === 'metamask') {
          connectMetaMask();
        }
      });
    }

    // Listen for Phantom disconnect
    const { solana } = window as any;
    if (solana?.isPhantom) {
      solana.on('disconnect', () => {
        if (wallet.walletType === 'phantom') {
          disconnect();
        }
      });
    }
  }, [wallet.walletType]);

  return (
    <WalletContext.Provider value={{ wallet, connectMetaMask, connectPhantom, disconnect, isConnecting, dexService }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

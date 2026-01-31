import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { type LiquidityPoolKeys } from '@raydium-io/raydium-sdk';
import { getOrca, OrcaPoolConfig, Network } from '@orca-so/sdk';
import Decimal from 'decimal.js';

// Common Solana token addresses
export const SOLANA_TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112', // Wrapped SOL
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // Raydium
  ORCA: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', // Orca
};

export interface SolanaSwapParams {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippageTolerance: number;
  userPublicKey: PublicKey;
}

export interface SolanaLiquidityParams {
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  slippageTolerance: number;
  userPublicKey: PublicKey;
  poolKeys?: LiquidityPoolKeys; // For Raydium
  poolConfig?: OrcaPoolConfig; // For Orca
  dexType?: 'raydium' | 'orca'; // Specify which DEX to use
}

export interface RemoveLiquidityParams {
  poolAddress: string;
  liquidity: string;
  userPublicKey: PublicKey;
  slippageTolerance: number;
  dexType?: 'raydium' | 'orca';
}

export class SolanaService {
  private connection: Connection;

  constructor(endpoint: string = 'https://api.mainnet-beta.solana.com') {
    this.connection = new Connection(endpoint, 'confirmed');
  }

  /**
   * Get SOL balance
   */
  async getBalance(publicKey: PublicKey): Promise<number> {
    const balance = await this.connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  }

  /**
   * Get token account balance
   * Note: Simplified version - in production, use proper SPL token account parsing
   */
  async getTokenBalance(_tokenMint: string, _owner: PublicKey): Promise<number> {
    try {
      // This is a simplified placeholder
      // In production, you would:
      // 1. Derive the associated token address
      // 2. Fetch and parse the token account data
      // For now, returning 0 to avoid version conflicts
      return 0;
    } catch (error) {
      console.error('Error getting token balance:', error);
      return 0;
    }
  }

  /**
   * Execute a swap using Jupiter Aggregator API
   * This uses Jupiter's API which aggregates Raydium, Orca, and other DEXs
   */
  async swap(params: SolanaSwapParams, signTransaction: (tx: Transaction) => Promise<Transaction>): Promise<string> {
    const { tokenIn, tokenOut, amountIn, slippageTolerance, userPublicKey } = params;

    try {
      // Step 1: Get quote from Jupiter API
      const quoteResponse = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${tokenIn}&outputMint=${tokenOut}&amount=${this.toSmallestUnit(amountIn)}&slippageBps=${Math.floor(slippageTolerance * 100)}`
      );

      if (!quoteResponse.ok) {
        throw new Error('Failed to get quote from Jupiter');
      }

      const quoteData = await quoteResponse.json();

      // Step 2: Get swap transaction
      const swapResponse = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteResponse: quoteData,
          userPublicKey: userPublicKey.toString(),
          wrapAndUnwrapSol: true,
        }),
      });

      if (!swapResponse.ok) {
        throw new Error('Failed to get swap transaction');
      }

      const { swapTransaction } = await swapResponse.json();

      // Step 3: Deserialize and sign transaction
      const transactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = Transaction.from(transactionBuf);

      const signedTransaction = await signTransaction(transaction);

      // Step 4: Send transaction
      const signature = await this.connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Step 5: Confirm transaction
      await this.connection.confirmTransaction(signature, 'confirmed');

      return signature;
    } catch (error) {
      console.error('Swap error:', error);
      throw new Error(`Swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get estimated output amount for a swap
   */
  async getQuote(tokenIn: string, tokenOut: string, amountIn: string): Promise<string> {
    try {
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${tokenIn}&outputMint=${tokenOut}&amount=${this.toSmallestUnit(amountIn)}&slippageBps=50`
      );

      if (!response.ok) {
        throw new Error('Failed to get quote');
      }

      const data = await response.json();
      return this.fromSmallestUnit(data.outAmount);
    } catch (error) {
      console.error('Quote error:', error);
      return '0';
    }
  }

  /**
   * Add liquidity to Raydium pool
   */
  async addLiquidityRaydium(
    params: SolanaLiquidityParams,
    _signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const { poolKeys } = params;

    if (!poolKeys) {
      throw new Error('Pool keys required for Raydium liquidity operations. Please fetch pool information from Raydium API first.');
    }

    try {
      // Note: Raydium SDK's liquidity operations require:
      // 1. Pool keys from Raydium API
      // 2. User token accounts
      // 3. Proper transaction construction
      
      throw new Error(
        'Raydium liquidity operations require pool keys from Raydium API. ' +
        'Please visit https://raydium.io/ to add liquidity directly, or implement pool key fetching.'
      );
    } catch (error) {
      console.error('Raydium add liquidity error:', error);
      throw error;
    }
  }

  /**
   * Add liquidity to Orca pool
   */
  async addLiquidityOrca(
    params: SolanaLiquidityParams,
    signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const { amountA, amountB, slippageTolerance, userPublicKey, poolConfig } = params;

    if (!poolConfig) {
      throw new Error('Pool config required for Orca liquidity operations');
    }

    try {
      // Initialize Orca SDK
      const orca = getOrca(this.connection, Network.MAINNET);
      
      // Get pool
      const pool = orca.getPool(poolConfig);

      // Convert amounts to Decimal
      const inputAmountA = new Decimal(amountA);
      const inputAmountB = new Decimal(amountB);

      // Calculate slippage tolerance
      const slippagePercent = new Decimal(slippageTolerance).div(100);

      // Deposit tokens to pool
      const depositQuote = await pool.getDepositQuote(inputAmountA, inputAmountB, slippagePercent);
      
      // Create deposit transaction
      const depositTxPayload = await pool.deposit(
        userPublicKey,
        depositQuote.maxTokenAIn,
        depositQuote.maxTokenBIn,
        depositQuote.minPoolTokenAmountOut
      );

      // Convert payload to Transaction
      const transaction = depositTxPayload.transaction;

      // Sign transaction
      const signedTransaction = await signTransaction(transaction);

      // Send transaction
      const signature = await this.connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      // Confirm transaction
      await this.connection.confirmTransaction(signature, 'confirmed');

      return signature;
    } catch (error) {
      console.error('Orca add liquidity error:', error);
      throw new Error(`Failed to add liquidity to Orca: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Add liquidity (auto-detect DEX or use specified)
   */
  async addLiquidity(
    params: SolanaLiquidityParams,
    signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const dexType = params.dexType || 'raydium'; // Default to Raydium

    if (dexType === 'raydium') {
      return this.addLiquidityRaydium(params, signTransaction);
    } else if (dexType === 'orca') {
      return this.addLiquidityOrca(params, signTransaction);
    } else {
      throw new Error(`Unsupported DEX type: ${dexType}`);
    }
  }

  /**
   * Remove liquidity from Raydium pool
   */
  async removeLiquidityRaydium(
    params: RemoveLiquidityParams,
    _signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const { poolAddress } = params;

    try {
      // Note: This requires pool keys which should be fetched from Raydium API
      throw new Error(
        'Raydium remove liquidity requires pool keys from Raydium API. ' +
        `Pool address: ${poolAddress}. ` +
        'Please visit https://raydium.io/ to remove liquidity directly, or implement pool key fetching.'
      );
    } catch (error) {
      console.error('Raydium remove liquidity error:', error);
      throw error;
    }
  }

  /**
   * Remove liquidity from Orca pool
   */
  async removeLiquidityOrca(
    params: RemoveLiquidityParams,
    _signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const { poolAddress } = params;

    try {
      // Note: Need to get pool config from pool address
      throw new Error(
        'Orca remove liquidity requires pool configuration. ' +
        `Pool address: ${poolAddress}. ` +
        'Please visit https://www.orca.so/ to remove liquidity directly, or provide pool config.'
      );
    } catch (error) {
      console.error('Orca remove liquidity error:', error);
      throw error;
    }
  }

  /**
   * Remove liquidity (auto-detect DEX or use specified)
   */
  async removeLiquidity(
    params: RemoveLiquidityParams,
    signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    const dexType = params.dexType || 'raydium'; // Default to Raydium

    if (dexType === 'raydium') {
      return this.removeLiquidityRaydium(params, signTransaction);
    } else if (dexType === 'orca') {
      return this.removeLiquidityOrca(params, signTransaction);
    } else {
      throw new Error(`Unsupported DEX type: ${dexType}`);
    }
  }

  /**
   * Get token price in USD
   */
  async getTokenPrice(tokenMint: string): Promise<number> {
    try {
      const response = await fetch(`https://price.jup.ag/v4/price?ids=${tokenMint}`);
      if (!response.ok) return 0;

      const data = await response.json();
      return data.data[tokenMint]?.price || 0;
    } catch (error) {
      console.error('Price fetch error:', error);
      return 0;
    }
  }

  /**
   * Convert to smallest unit (lamports for SOL, or token decimals)
   */
  private toSmallestUnit(amount: string, decimals: number = 9): string {
    const amountNum = parseFloat(amount);
    return Math.floor(amountNum * Math.pow(10, decimals)).toString();
  }

  /**
   * Convert from smallest unit
   */
  private fromSmallestUnit(amount: string, decimals: number = 9): string {
    const amountNum = parseFloat(amount);
    return (amountNum / Math.pow(10, decimals)).toString();
  }

  /**
   * Get recent transactions for an address
   */
  async getRecentTransactions(publicKey: PublicKey, limit: number = 10): Promise<any[]> {
    try {
      const signatures = await this.connection.getSignaturesForAddress(publicKey, { limit });
      return signatures;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }

  /**
   * Check if a transaction is confirmed
   */
  async isTransactionConfirmed(signature: string): Promise<boolean> {
    try {
      const status = await this.connection.getSignatureStatus(signature);
      return status.value?.confirmationStatus === 'confirmed' || 
             status.value?.confirmationStatus === 'finalized';
    } catch (error) {
      return false;
    }
  }
}

import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Common Solana token addresses
export const SOLANA_TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112', // Wrapped SOL
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // Raydium
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
   * Note: This is a simplified version. In production, use @solana/spl-token
   */
  async getTokenBalance(_tokenMint: string, _owner: PublicKey): Promise<number> {
    try {
      // This is a placeholder. In production, you would:
      // 1. Find the associated token account
      // 2. Get the token account balance
      // For now, returning 0 as this requires SPL Token program integration
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
   * Add liquidity (Raydium/Orca)
   * Note: This is a placeholder. Actual implementation requires specific DEX SDK
   */
  async addLiquidity(
    _params: SolanaLiquidityParams,
    _signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    // This is a placeholder for liquidity addition
    // In production, you would integrate with Raydium or Orca SDK
    throw new Error('Liquidity operations require specific DEX SDK integration. Please use Raydium or Orca directly.');
  }

  /**
   * Remove liquidity (Raydium/Orca)
   * Note: This is a placeholder. Actual implementation requires specific DEX SDK
   */
  async removeLiquidity(
    _poolAddress: string,
    _liquidity: string,
    _userPublicKey: PublicKey,
    _signTransaction: (tx: Transaction) => Promise<Transaction>
  ): Promise<string> {
    // This is a placeholder for liquidity removal
    // In production, you would integrate with Raydium or Orca SDK
    throw new Error('Liquidity operations require specific DEX SDK integration. Please use Raydium or Orca directly.');
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

import { Block, Transaction, FoodItem } from '../types/blockchain';

export class FoodTraceabilityBlockchain {
  private chain: Block[] = [];
  private pendingTransactions: Transaction[] = [];
  private difficulty = 2;

  constructor() {
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: new Date(),
      transactions: [],
      previousHash: '0',
      hash: this.calculateHash(0, new Date(), [], '0', 0),
      nonce: 0
    };
    this.chain.push(genesisBlock);
  }

  private calculateHash(index: number, timestamp: Date, transactions: Transaction[], previousHash: string, nonce: number): string {
    const data = `${index}${timestamp.toISOString()}${JSON.stringify(transactions)}${previousHash}${nonce}`;
    return this.simpleHash(data);
  }

  private simpleHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  private mineBlock(block: Block): void {
    const target = Array(this.difficulty + 1).join('0');
    
    while (block.hash.substring(0, this.difficulty) !== target) {
      block.nonce++;
      block.hash = this.calculateHash(
        block.index,
        block.timestamp,
        block.transactions,
        block.previousHash,
        block.nonce
      );
    }
  }

  addTransaction(transaction: Transaction): void {
    // Calculate hash for the transaction
    const transactionData = `${transaction.productId}${transaction.timestamp.toISOString()}${transaction.action}${transaction.location}${transaction.actor}`;
    transaction.hash = this.simpleHash(transactionData);
    
    // Set previous hash (last transaction's hash or genesis)
    const lastTransaction = this.getLastTransaction();
    transaction.previousHash = lastTransaction ? lastTransaction.hash : '0';
    
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(): Block | null {
    if (this.pendingTransactions.length === 0) return null;

    const block: Block = {
      index: this.chain.length,
      timestamp: new Date(),
      transactions: [...this.pendingTransactions],
      previousHash: this.getLatestBlock().hash,
      hash: '',
      nonce: 0
    };

    block.hash = this.calculateHash(
      block.index,
      block.timestamp,
      block.transactions,
      block.previousHash,
      block.nonce
    );

    this.mineBlock(block);
    this.chain.push(block);
    this.pendingTransactions = [];
    
    return block;
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  private getLastTransaction(): Transaction | null {
    for (let i = this.chain.length - 1; i >= 0; i--) {
      const block = this.chain[i];
      if (block.transactions.length > 0) {
        return block.transactions[block.transactions.length - 1];
      }
    }
    return null;
  }

  getProductHistory(productId: string): Transaction[] {
    const history: Transaction[] = [];
    
    for (const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.productId === productId) {
          history.push(transaction);
        }
      }
    }
    
    return history.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  getAllTransactions(): Transaction[] {
    const allTransactions: Transaction[] = [];
    
    for (const block of this.chain) {
      allTransactions.push(...block.transactions);
    }
    
    return allTransactions;
  }

  getChain(): Block[] {
    return [...this.chain];
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(
        currentBlock.index,
        currentBlock.timestamp,
        currentBlock.transactions,
        currentBlock.previousHash,
        currentBlock.nonce
      )) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
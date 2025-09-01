export interface FoodItem {
  id: string;
  name: string;
  category: 'produce' | 'meat' | 'dairy' | 'grain' | 'seafood';
  origin: string;
  currentLocation: string;
  status: 'harvested' | 'processed' | 'packaged' | 'shipped' | 'delivered' | 'sold';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  productId: string;
  timestamp: Date;
  action: string;
  location: string;
  actor: string;
  details: string;
  previousHash: string;
  hash: string;
}

export interface Block {
  index: number;
  timestamp: Date;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
}

export interface SupplyChainActor {
  id: string;
  name: string;
  type: 'farmer' | 'processor' | 'distributor' | 'retailer' | 'consumer';
  location: string;
}
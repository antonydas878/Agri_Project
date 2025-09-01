import { useState, useEffect } from 'react';
import { FoodTraceabilityBlockchain } from '../utils/blockchain';
import { Transaction, FoodItem } from '../types/blockchain';
import { sampleFoodItems } from '../data/sampleData';

export const useBlockchain = () => {
  const [blockchain] = useState(() => new FoodTraceabilityBlockchain());
  const [foodItems, setFoodItems] = useState<FoodItem[]>(sampleFoodItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize with sample transactions
    initializeSampleData();
  }, []);

  const initializeSampleData = () => {
    const sampleTransactions: Omit<Transaction, 'id' | 'hash' | 'previousHash'>[] = [
      {
        productId: 'APPLE001',
        timestamp: new Date('2024-01-15T08:00:00'),
        action: 'Harvested',
        location: 'Green Valley Farm, Washington',
        actor: 'John Smith (Farmer)',
        details: 'Organic Gala apples harvested at optimal ripeness'
      },
      {
        productId: 'APPLE001',
        timestamp: new Date('2024-01-15T14:30:00'),
        action: 'Quality Inspection',
        location: 'Green Valley Farm, Washington',
        actor: 'Sarah Johnson (Quality Inspector)',
        details: 'Passed organic certification and quality standards'
      },
      {
        productId: 'APPLE001',
        timestamp: new Date('2024-01-16T09:15:00'),
        action: 'Packaged',
        location: 'Fresh Processing Co., Oregon',
        actor: 'Mike Wilson (Packaging)',
        details: 'Packaged in biodegradable containers, lot #A2024-001'
      },
      {
        productId: 'APPLE001',
        timestamp: new Date('2024-01-17T11:00:00'),
        action: 'Shipped',
        location: 'Northwest Distribution, Seattle',
        actor: 'Transport Team Alpha',
        details: 'Temperature-controlled transport to retail locations'
      },
      {
        productId: 'APPLE001',
        timestamp: new Date('2024-01-18T07:45:00'),
        action: 'Delivered',
        location: 'Fresh Market Downtown, Portland',
        actor: 'Delivery Driver #247',
        details: 'Delivered to retail location, temperature log verified'
      }
    ];

    sampleTransactions.forEach(tx => {
      const transaction: Transaction = {
        ...tx,
        id: `TX${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
        hash: '',
        previousHash: ''
      };
      blockchain.addTransaction(transaction);
    });

    blockchain.minePendingTransactions();
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'hash' | 'previousHash'>) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTransaction: Transaction = {
      ...transaction,
      id: `TX${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      hash: '',
      previousHash: ''
    };
    
    blockchain.addTransaction(newTransaction);
    const newBlock = blockchain.minePendingTransactions();
    
    if (newBlock) {
      // Update food item status if needed
      setFoodItems(prev => prev.map(item => {
        if (item.id === transaction.productId) {
          return {
            ...item,
            currentLocation: transaction.location,
            status: getStatusFromAction(transaction.action)
          };
        }
        return item;
      }));
    }
    
    setIsLoading(false);
    return newTransaction;
  };

  const getStatusFromAction = (action: string): FoodItem['status'] => {
    const actionLower = action.toLowerCase();
    if (actionLower.includes('harvest')) return 'harvested';
    if (actionLower.includes('process')) return 'processed';
    if (actionLower.includes('package')) return 'packaged';
    if (actionLower.includes('ship')) return 'shipped';
    if (actionLower.includes('deliver')) return 'delivered';
    if (actionLower.includes('sold')) return 'sold';
    return 'harvested';
  };

  const getProductHistory = (productId: string) => {
    return blockchain.getProductHistory(productId);
  };

  const getAllTransactions = () => {
    return blockchain.getAllTransactions();
  };

  const getChain = () => {
    return blockchain.getChain();
  };

  const isChainValid = () => {
    return blockchain.isChainValid();
  };

  return {
    foodItems,
    setFoodItems,
    addTransaction,
    getProductHistory,
    getAllTransactions,
    getChain,
    isChainValid,
    isLoading
  };
};
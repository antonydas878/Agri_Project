import { FoodItem, SupplyChainActor } from '../types/blockchain';

export const sampleFoodItems: FoodItem[] = [
  {
    id: 'APPLE001',
    name: 'Organic Gala Apples',
    category: 'produce',
    origin: 'Green Valley Farm, Washington',
    currentLocation: 'Fresh Market Downtown',
    status: 'delivered',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'BEEF002',
    name: 'Grass-Fed Beef',
    category: 'meat',
    origin: 'Sunrise Ranch, Montana',
    currentLocation: 'Premium Butcher Shop',
    status: 'processed',
    createdAt: new Date('2024-01-10')
  },
  {
    id: 'MILK003',
    name: 'Organic Whole Milk',
    category: 'dairy',
    origin: 'Happy Cow Dairy, Vermont',
    currentLocation: 'City Grocery Store',
    status: 'packaged',
    createdAt: new Date('2024-01-20')
  }
];

export const supplyChainActors: SupplyChainActor[] = [
  {
    id: 'FARM001',
    name: 'Green Valley Farm',
    type: 'farmer',
    location: 'Washington State'
  },
  {
    id: 'PROC001',
    name: 'Fresh Processing Co.',
    type: 'processor',
    location: 'Oregon'
  },
  {
    id: 'DIST001',
    name: 'Northwest Distribution',
    type: 'distributor',
    location: 'Seattle, WA'
  },
  {
    id: 'RET001',
    name: 'Fresh Market Downtown',
    type: 'retailer',
    location: 'Portland, OR'
  }
];
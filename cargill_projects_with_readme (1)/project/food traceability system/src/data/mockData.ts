import { Product, SupplyChainEvent, ContaminationAlert } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'PROD-001',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    batchNumber: 'BATCH-TOM-2025001',
    qrCode: 'QR-PROD-001',
    origin: {
      farm: 'Green Valley Farm',
      location: 'California, USA',
      farmer: 'John Smith'
    },
    currentStage: 'retail',
    status: 'safe',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'PROD-002',
    name: 'Free Range Chicken',
    category: 'Meat',
    batchNumber: 'BATCH-CHK-2025002',
    qrCode: 'QR-PROD-002',
    origin: {
      farm: 'Happy Hen Farm',
      location: 'Iowa, USA',
      farmer: 'Sarah Johnson'
    },
    currentStage: 'processing',
    status: 'in_transit',
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-19')
  },
  {
    id: 'PROD-003',
    name: 'Wild Salmon',
    category: 'Seafood',
    batchNumber: 'BATCH-SAL-2025003',
    qrCode: 'QR-PROD-003',
    origin: {
      farm: 'Pacific Coast Fishery',
      location: 'Alaska, USA',
      farmer: 'Mike Rodriguez'
    },
    currentStage: 'quality_control',
    status: 'warning',
    createdAt: new Date('2025-01-16'),
    updatedAt: new Date('2025-01-21')
  }
];

export const mockEvents: SupplyChainEvent[] = [
  {
    id: 'EVENT-001',
    productId: 'PROD-001',
    stage: 'farm',
    location: 'Green Valley Farm, CA',
    responsibleParty: 'John Smith',
    timestamp: new Date('2025-01-15T08:00:00'),
    temperature: 22,
    humidity: 65,
    notes: 'Harvested fresh organic tomatoes'
  },
  {
    id: 'EVENT-002',
    productId: 'PROD-001',
    stage: 'processing',
    location: 'Fresh Foods Processing Center',
    responsibleParty: 'Maria Garcia',
    timestamp: new Date('2025-01-16T10:30:00'),
    temperature: 4,
    humidity: 80,
    notes: 'Washed and packaged'
  },
  {
    id: 'EVENT-003',
    productId: 'PROD-001',
    stage: 'distribution',
    location: 'Central Distribution Hub',
    responsibleParty: 'Tom Wilson',
    timestamp: new Date('2025-01-18T14:15:00'),
    temperature: 3,
    humidity: 75,
    notes: 'Ready for retail distribution'
  }
];

export const mockAlerts: ContaminationAlert[] = [
  {
    id: 'ALERT-001',
    productId: 'PROD-003',
    batchNumber: 'BATCH-SAL-2025003',
    severity: 'medium',
    contaminationType: 'Bacterial',
    description: 'Potential Salmonella contamination detected in quality control',
    affectedProducts: ['PROD-003'],
    status: 'investigating',
    reportedAt: new Date('2025-01-21T09:30:00')
  }
];
export interface Product {
  id: string;
  name: string;
  category: string;
  batchNumber: string;
  qrCode: string;
  origin: {
    farm: string;
    location: string;
    farmer: string;
  };
  currentStage: SupplyChainStage;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplyChainEvent {
  id: string;
  productId: string;
  stage: SupplyChainStage;
  location: string;
  responsibleParty: string;
  timestamp: Date;
  temperature?: number;
  humidity?: number;
  notes?: string;
  photos?: string[];
}

export interface ContaminationAlert {
  id: string;
  productId: string;
  batchNumber: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  contaminationType: string;
  description: string;
  affectedProducts: string[];
  status: 'active' | 'resolved' | 'investigating';
  reportedAt: Date;
  resolvedAt?: Date;
}

export type SupplyChainStage = 
  | 'farm' 
  | 'processing' 
  | 'quality_control' 
  | 'packaging' 
  | 'distribution' 
  | 'retail' 
  | 'consumer';

export type ProductStatus = 
  | 'safe' 
  | 'in_transit' 
  | 'warning' 
  | 'contaminated' 
  | 'recalled';

export interface Analytics {
  totalProducts: number;
  averageTransitTime: number;
  contaminationRate: number;
  stageBreakdown: Record<SupplyChainStage, number>;
  recentAlerts: number;
}
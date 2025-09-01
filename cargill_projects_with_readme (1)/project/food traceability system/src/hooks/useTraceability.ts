import { useState, useEffect } from 'react';
import { Product, SupplyChainEvent, ContaminationAlert, Analytics } from '../types';
import { mockProducts, mockEvents, mockAlerts } from '../data/mockData';

export const useTraceability = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [events, setEvents] = useState<SupplyChainEvent[]>([]);
  const [alerts, setAlerts] = useState<ContaminationAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(mockProducts);
      setEvents(mockEvents);
      setAlerts(mockAlerts);
      setLoading(false);
    };

    loadData();
  }, []);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: `PROD-${String(products.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProductStage = (productId: string, stage: Product['currentStage'], status: Product['status']) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, currentStage: stage, status, updatedAt: new Date() }
          : product
      )
    );
  };

  const addEvent = (event: Omit<SupplyChainEvent, 'id'>) => {
    const newEvent: SupplyChainEvent = {
      ...event,
      id: `EVENT-${String(events.length + 1).padStart(3, '0')}`
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const addAlert = (alert: Omit<ContaminationAlert, 'id'>) => {
    const newAlert: ContaminationAlert = {
      ...alert,
      id: `ALERT-${String(alerts.length + 1).padStart(3, '0')}`
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const getProductEvents = (productId: string) => {
    return events.filter(event => event.productId === productId)
                 .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getAnalytics = (): Analytics => {
    const totalProducts = products.length;
    const contaminatedProducts = products.filter(p => p.status === 'contaminated').length;
    const contaminationRate = totalProducts > 0 ? (contaminatedProducts / totalProducts) * 100 : 0;
    
    const stageBreakdown = products.reduce((acc, product) => {
      acc[product.currentStage] = (acc[product.currentStage] || 0) + 1;
      return acc;
    }, {} as Record<Product['currentStage'], number>);

    const recentAlerts = alerts.filter(alert => 
      new Date().getTime() - alert.reportedAt.getTime() < 7 * 24 * 60 * 60 * 1000
    ).length;

    return {
      totalProducts,
      averageTransitTime: 3.2, // Mock average in days
      contaminationRate,
      stageBreakdown,
      recentAlerts
    };
  };

  return {
    products,
    events,
    alerts,
    loading,
    addProduct,
    updateProductStage,
    addEvent,
    addAlert,
    getProductEvents,
    getAnalytics
  };
};
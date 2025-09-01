import React, { useState } from 'react';
import { MapPin, Clock, AlertTriangle, CheckCircle, Eye, QrCode } from 'lucide-react';
import { Product } from '../types';
import { ProductTimeline } from './ProductTimeline';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showTimeline, setShowTimeline] = useState(false);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contaminated': return 'bg-red-100 text-red-800 border-red-200';
      case 'recalled': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Product['status']) => {
    switch (status) {
      case 'safe': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'contaminated': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatStage = (stage: string) => {
    return stage.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 bg-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <QrCode className="h-4 w-4 mr-1" />
                {product.batchNumber}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {product.origin.farm}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
              {getStatusIcon(product.status)}
              <span className="ml-1">{product.status.replace('_', ' ').toUpperCase()}</span>
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {formatStage(product.currentStage)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p>Farmer: {product.origin.farmer}</p>
            <p>Location: {product.origin.location}</p>
            <p>Last Updated: {product.updatedAt.toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => setShowTimeline(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Timeline
          </button>
        </div>
      </div>

      {showTimeline && (
        <ProductTimeline 
          product={product} 
          onClose={() => setShowTimeline(false)} 
        />
      )}
    </>
  );
};
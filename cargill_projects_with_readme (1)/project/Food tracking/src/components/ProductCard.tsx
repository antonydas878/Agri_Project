import React from 'react';
import { FoodItem } from '../types/blockchain';
import { MapPin, Calendar, Package, Truck, CheckCircle, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: FoodItem;
  onViewHistory: (productId: string) => void;
}

const statusIcons = {
  harvested: Package,
  processed: Package,
  packaged: Package,
  shipped: Truck,
  delivered: CheckCircle,
  sold: ShoppingCart
};

const statusColors = {
  harvested: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processed: 'bg-blue-100 text-blue-800 border-blue-200',
  packaged: 'bg-purple-100 text-purple-800 border-purple-200',
  shipped: 'bg-orange-100 text-orange-800 border-orange-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  sold: 'bg-gray-100 text-gray-800 border-gray-200'
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewHistory }) => {
  const StatusIcon = statusIcons[product.status];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              ID: {product.id}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[product.status]} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span className="capitalize">{product.status}</span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Origin:</span>
            <span className="ml-1">{product.origin}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Current:</span>
            <span className="ml-1">{product.currentLocation}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className="font-medium">Created:</span>
            <span className="ml-1">{product.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        <button
          onClick={() => onViewHistory(product.id)}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium text-sm"
        >
          View Supply Chain History
        </button>
      </div>
    </div>
  );
};
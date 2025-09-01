import React, { useState } from 'react';
import { X, Plus, QrCode } from 'lucide-react';
import { Product } from '../types';

interface AddProductFormProps {
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    batchNumber: '',
    qrCode: '',
    farm: '',
    location: '',
    farmer: '',
    currentStage: 'farm' as Product['currentStage'],
    status: 'safe' as Product['status']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name,
      category: formData.category,
      batchNumber: formData.batchNumber,
      qrCode: formData.qrCode || `QR-${formData.batchNumber}`,
      origin: {
        farm: formData.farm,
        location: formData.location,
        farmer: formData.farmer
      },
      currentStage: formData.currentStage,
      status: formData.status
    };

    onAdd(product);
    onClose();
  };

  const generateBatchNumber = () => {
    const prefix = formData.category.slice(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    const batchNumber = `BATCH-${prefix}-${timestamp}`;
    setFormData(prev => ({ ...prev, batchNumber }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Product Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Meat">Meat</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={formData.batchNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, batchNumber: e.target.value }))}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="BATCH-VEG-123456"
                  />
                  <button
                    type="button"
                    onClick={generateBatchNumber}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={formData.qrCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, qrCode: e.target.value }))}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Auto-generated from batch number"
                  />
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Origin Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Origin Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  required
                  value={formData.farm}
                  onChange={(e) => setFormData(prev => ({ ...prev, farm: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Green Valley Farm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., California, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer/Producer</label>
                <input
                  type="text"
                  required
                  value={formData.farmer}
                  onChange={(e) => setFormData(prev => ({ ...prev, farmer: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stage</label>
                <select
                  value={formData.currentStage}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentStage: e.target.value as Product['currentStage'] }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="farm">Farm</option>
                  <option value="processing">Processing</option>
                  <option value="quality_control">Quality Control</option>
                  <option value="packaging">Packaging</option>
                  <option value="distribution">Distribution</option>
                  <option value="retail">Retail</option>
                  <option value="consumer">Consumer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Product['status'] }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="safe">Safe</option>
                  <option value="in_transit">In Transit</option>
                  <option value="warning">Warning</option>
                  <option value="contaminated">Contaminated</option>
                  <option value="recalled">Recalled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
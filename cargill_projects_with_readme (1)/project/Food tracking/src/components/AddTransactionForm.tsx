import React, { useState } from 'react';
import { Transaction } from '../types/blockchain';
import { Plus, X } from 'lucide-react';

interface AddTransactionFormProps {
  productId: string;
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'hash' | 'previousHash'>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  productId,
  onAddTransaction,
  onClose,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    action: '',
    location: '',
    actor: '',
    details: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.action || !formData.location || !formData.actor) {
      return;
    }

    await onAddTransaction({
      productId,
      timestamp: new Date(),
      ...formData
    });

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Plus className="w-6 h-6" />
              <h2 className="text-xl font-bold">Add Transaction</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-green-100 text-sm mt-1">Product ID: {productId}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action *
            </label>
            <select
              name="action"
              value={formData.action}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select an action</option>
              <option value="Harvested">Harvested</option>
              <option value="Quality Inspection">Quality Inspection</option>
              <option value="Processed">Processed</option>
              <option value="Packaged">Packaged</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Sold">Sold</option>
              <option value="Temperature Check">Temperature Check</option>
              <option value="Storage">Storage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Green Valley Farm, Washington"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Actor *
            </label>
            <input
              type="text"
              name="actor"
              value={formData.actor}
              onChange={handleChange}
              required
              placeholder="e.g., John Smith (Farmer)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              placeholder="Additional details about this transaction..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.action || !formData.location || !formData.actor}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Adding...' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
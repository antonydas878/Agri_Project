import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { SearchBar, SearchFilters } from './SearchBar';
import { AddProductForm } from './AddProductForm';
import { useTraceability } from '../hooks/useTraceability';

export const TraceabilityApp: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    status: '',
    stage: '',
    category: ''
  });

  const { products, addProduct } = useTraceability();

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.qrCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = !filters.status || product.status === filters.status;
      const matchesStage = !filters.stage || product.currentStage === filters.stage;
      const matchesCategory = !filters.category || product.category === filters.category;

      return matchesSearch && matchesStatus && matchesStage && matchesCategory;
    });
  }, [products, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Food Traceability System</h1>
              <p className="text-gray-600 mt-1">Track food products from farm to consumer with complete transparency</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar onSearch={setSearchQuery} onFilterChange={setFilters} />
      </div>

      {/* Dashboard */}
      <Dashboard />

      {/* Add Product Modal */}
      {showAddForm && (
        <AddProductForm
          onClose={() => setShowAddForm(false)}
          onAdd={addProduct}
        />
      )}
    </div>
  );
};
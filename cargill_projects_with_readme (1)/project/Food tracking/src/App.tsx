import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { TransactionHistory } from './components/TransactionHistory';
import { AddTransactionForm } from './components/AddTransactionForm';
import { BlockchainViewer } from './components/BlockchainViewer';
import { StatsCard } from './components/StatsCard';
import { useBlockchain } from './hooks/useBlockchain';
import { Package, Activity, Shield, Eye, Plus, Blocks } from 'lucide-react';

function App() {
  const {
    foodItems,
    addTransaction,
    getProductHistory,
    getAllTransactions,
    getChain,
    isChainValid,
    isLoading
  } = useBlockchain();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [showAddTransaction, setShowAddTransaction] = useState<string | null>(null);
  const [showBlockchain, setShowBlockchain] = useState(false);

  const allTransactions = getAllTransactions();
  const blocks = getChain();

  const handleViewHistory = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleAddTransaction = async (transaction: any) => {
    await addTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={foodItems.length}
            icon={Package}
            color="bg-blue-500"
            description="Items being tracked"
          />
          <StatsCard
            title="Total Transactions"
            value={allTransactions.length}
            icon={Activity}
            color="bg-green-500"
            description="Immutable records"
          />
          <StatsCard
            title="Blockchain Blocks"
            value={blocks.length}
            icon={Blocks}
            color="bg-purple-500"
            description="Mined blocks"
          />
          <StatsCard
            title="Chain Status"
            value={isChainValid() ? "Valid" : "Invalid"}
            icon={Shield}
            color={isChainValid() ? "bg-emerald-500" : "bg-red-500"}
            description="Security verified"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowBlockchain(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md"
          >
            <Eye className="w-5 h-5" />
            <span>View Blockchain</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tracked Food Products</h2>
            <p className="text-gray-600">
              {foodItems.length} product{foodItems.length !== 1 ? 's' : ''} in the supply chain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onViewHistory={handleViewHistory}
                />
                <button
                  onClick={() => setShowAddTransaction(product.id)}
                  className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors shadow-md"
                  title="Add Transaction"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-green-600" />
            Recent Transactions
          </h3>
          
          {allTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {allTransactions
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, 5)
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {transaction.productId}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.action}</p>
                        <p className="text-sm text-gray-600">{transaction.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{transaction.actor}</p>
                      <p className="text-xs text-gray-400">
                        {transaction.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedProductId && (
        <TransactionHistory
          transactions={getProductHistory(selectedProductId)}
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}

      {showAddTransaction && (
        <AddTransactionForm
          productId={showAddTransaction}
          onAddTransaction={handleAddTransaction}
          onClose={() => setShowAddTransaction(null)}
          isLoading={isLoading}
        />
      )}

      {showBlockchain && (
        <BlockchainViewer
          blocks={blocks}
          isValid={isChainValid()}
          onClose={() => setShowBlockchain(false)}
        />
      )}
    </div>
  );
}

export default App;
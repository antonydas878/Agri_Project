import React from 'react';
import { Transaction } from '../types/blockchain';
import { Clock, MapPin, User, FileText, Hash, Link } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
  productId: string;
  onClose: () => void;
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ 
  transactions, 
  productId, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Supply Chain History</h2>
              <p className="text-green-100">Product ID: {productId}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found for this product.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        #{index + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900">{transaction.action}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {transaction.timestamp.toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">Location:</span>
                      <span className="ml-1">{transaction.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">Actor:</span>
                      <span className="ml-1">{transaction.actor}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-start text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                      <div>
                        <span className="font-medium">Details:</span>
                        <p className="ml-1 mt-1">{transaction.details}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Hash className="w-3 h-3 mr-2" />
                      <span className="font-medium">Hash:</span>
                      <code className="ml-1 bg-gray-200 px-2 py-1 rounded font-mono">
                        {transaction.hash}
                      </code>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Link className="w-3 h-3 mr-2" />
                      <span className="font-medium">Previous Hash:</span>
                      <code className="ml-1 bg-gray-200 px-2 py-1 rounded font-mono">
                        {transaction.previousHash}
                      </code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Block } from '../types/blockchain';
import { Cuboid as Cube, Hash, Clock, FileText } from 'lucide-react';

interface BlockchainViewerProps {
  blocks: Block[];
  isValid: boolean;
  onClose: () => void;
}

export const BlockchainViewer: React.FC<BlockchainViewerProps> = ({ 
  blocks, 
  isValid, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cube className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Blockchain Ledger</h2>
                <p className="text-blue-100">Immutable Transaction History</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                isValid 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isValid ? '✓ Valid Chain' : '✗ Invalid Chain'}
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {blocks.map((block, blockIndex) => (
              <div key={block.index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Cube className="w-5 h-5 mr-2 text-blue-600" />
                      Block #{block.index}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {block.timestamp.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="font-medium">Hash:</span>
                      <code className="ml-1 bg-white px-2 py-1 rounded font-mono text-xs">
                        {block.hash}
                      </code>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="font-medium">Previous:</span>
                      <code className="ml-1 bg-white px-2 py-1 rounded font-mono text-xs">
                        {block.previousHash}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {block.transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Genesis Block - No Transactions</p>
                  ) : (
                    <div className="space-y-3">
                      {block.transactions.map((transaction, txIndex) => (
                        <div
                          key={transaction.id}
                          className="bg-white border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                                TX #{txIndex + 1}
                              </div>
                              <span className="font-medium text-gray-900">{transaction.action}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {transaction.timestamp.toLocaleString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-2">
                            <div>
                              <span className="font-medium">Product:</span> {transaction.productId}
                            </div>
                            <div>
                              <span className="font-medium">Actor:</span> {transaction.actor}
                            </div>
                            <div className="md:col-span-2">
                              <span className="font-medium">Location:</span> {transaction.location}
                            </div>
                          </div>

                          {transaction.details && (
                            <div className="text-sm text-gray-600 mb-2">
                              <span className="font-medium">Details:</span> {transaction.details}
                            </div>
                          )}

                          <div className="text-xs text-gray-400 font-mono">
                            Hash: {transaction.hash}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
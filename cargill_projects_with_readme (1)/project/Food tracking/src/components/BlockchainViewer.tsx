import React from 'react';
import { Block } from '../types/blockchain';
import { Blocks, Hash, Clock, FileText, X } from 'lucide-react';

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
              <Blocks className="w-8 h-8" />
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
                className="text-white hover:text-blue-200 transition-colors p-1"
              >
                <X className="w-6 h-6" />
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
                      <Blocks className="w-5 h-5 mr-2 text-blue-600" />
                      Block #{block.index}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {block.timestamp.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="font-medium">Hash:</span>
                      <code className="ml-2 bg-white px-2 py-1 rounded font-mono text-xs break-all">
                        {block.hash}
                      </code>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Hash className="w-4 h-4 mr-2" />
                      <span className="font-medium">Previous:</span>
                      <code className="ml-2 bg-white px-2 py-1 rounded font-mono text-xs break-all">
                        {block.previousHash}
                      </code>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Nonce:</span> {block.nonce} | 
                    <span className="font-medium ml-2">Transactions:</span> {block.transactions.length}
                  </div>
                </div>

                <div className="p-4">
                  {block.transactions.length === 0 ? (
                    <div className="text-center py-8">
                      <Blocks className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Genesis Block - No Transactions</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {block.transactions.map((transaction, txIndex) => (
                        <div
                          key={transaction.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
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

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Product:</span> 
                              <span className="ml-1">{transaction.productId}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              <span className="font-medium">Location:</span> 
                              <span className="ml-1">{transaction.location}</span>
                            </div>
                            <div className="md:col-span-2 flex items-center">
                              <span className="font-medium">Actor:</span> 
                              <span className="ml-1">{transaction.actor}</span>
                            </div>
                          </div>

                          {transaction.details && (
                            <div className="text-sm text-gray-600 mb-3 p-3 bg-gray-50 rounded">
                              <span className="font-medium">Details:</span> {transaction.details}
                            </div>
                          )}

                          <div className="border-t pt-3 space-y-1">
                            <div className="text-xs text-gray-400 font-mono flex items-center">
                              <Hash className="w-3 h-3 mr-1" />
                              <span className="font-medium">Hash:</span>
                              <code className="ml-2 bg-gray-100 px-2 py-1 rounded break-all">
                                {transaction.hash}
                              </code>
                            </div>
                            <div className="text-xs text-gray-400 font-mono flex items-center">
                              <Hash className="w-3 h-3 mr-1" />
                              <span className="font-medium">Prev:</span>
                              <code className="ml-2 bg-gray-100 px-2 py-1 rounded break-all">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

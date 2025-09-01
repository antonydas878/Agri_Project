import React from 'react';
import { Shield, Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8" />
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FoodTrace</h1>
              <p className="text-green-100 text-xs">Blockchain Food Traceability</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">Farm to Fork</p>
              <p className="text-green-100 text-xs">Transparency & Trust</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
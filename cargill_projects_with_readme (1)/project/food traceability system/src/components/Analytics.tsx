import React from 'react';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';
import { Analytics as AnalyticsType } from '../types';

interface AnalyticsProps {
  analytics: AnalyticsType;
}

export const Analytics: React.FC<AnalyticsProps> = ({ analytics }) => {
  const stageLabels = {
    farm: 'Farm',
    processing: 'Processing',
    quality_control: 'Quality Control',
    packaging: 'Packaging',
    distribution: 'Distribution',
    retail: 'Retail',
    consumer: 'Consumer'
  };

  const maxCount = Math.max(...Object.values(analytics.stageBreakdown));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Analytics
        </h2>
      </div>
      <div className="p-6">
        {/* Supply Chain Distribution */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Supply Chain Distribution</h3>
          <div className="space-y-2">
            {Object.entries(analytics.stageBreakdown).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{stageLabels[stage as keyof typeof stageLabels]}</span>
                <div className="flex items-center space-x-2 flex-1 ml-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${maxCount > 0 ? (count / maxCount) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">Safety Rate</span>
            </div>
            <span className="text-lg font-bold text-blue-900">
              {(100 - analytics.contaminationRate).toFixed(1)}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">Avg Transit Time</span>
            </div>
            <span className="text-lg font-bold text-green-900">
              {analytics.averageTransitTime} days
            </span>
          </div>

          {analytics.recentAlerts > 0 && (
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Recent Alerts</span>
              </div>
              <span className="text-lg font-bold text-yellow-900">
                {analytics.recentAlerts}
              </span>
            </div>
          )}
        </div>

        {/* Performance Indicators */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Performance Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {analytics.totalProducts}
              </div>
              <div className="text-xs text-gray-600">Products Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {(analytics.contaminationRate).toFixed(1)}%
              </div>
              <div className="text-xs text-gray-600">Contamination Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
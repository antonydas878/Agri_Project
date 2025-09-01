import React from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';
import { ContaminationAlert } from '../types';

interface AlertCardProps {
  alert: ContaminationAlert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getSeverityColor = (severity: ContaminationAlert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'critical': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: ContaminationAlert['status']) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h4 className="text-sm font-semibold text-gray-900">{alert.contaminationType}</h4>
        </div>
        <div className="flex space-x-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
            {alert.severity.toUpperCase()}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
            {alert.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
      
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          Batch: {alert.batchNumber}
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Reported: {alert.reportedAt.toLocaleDateString()} {alert.reportedAt.toLocaleTimeString()}
        </div>
        <div>
          Affected Products: {alert.affectedProducts.length}
        </div>
      </div>

      {alert.status === 'active' && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200">
            Initiate Recall Process
          </button>
        </div>
      )}
    </div>
  );
};
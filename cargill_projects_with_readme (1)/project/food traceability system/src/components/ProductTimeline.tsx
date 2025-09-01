import React from 'react';
import { X, MapPin, Clock, Thermometer, Droplets, User } from 'lucide-react';
import { Product } from '../types';
import { useTraceability } from '../hooks/useTraceability';

interface ProductTimelineProps {
  product: Product;
  onClose: () => void;
}

export const ProductTimeline: React.FC<ProductTimelineProps> = ({ product, onClose }) => {
  const { getProductEvents } = useTraceability();
  const events = getProductEvents(product.id);

  const stageOrder = ['farm', 'processing', 'quality_control', 'packaging', 'distribution', 'retail', 'consumer'];

  const formatStage = (stage: string) => {
    return stage.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getStageColor = (stage: string) => {
    const colors = {
      farm: 'bg-green-500',
      processing: 'bg-blue-500',
      quality_control: 'bg-purple-500',
      packaging: 'bg-indigo-500',
      distribution: 'bg-orange-500',
      retail: 'bg-pink-500',
      consumer: 'bg-gray-500'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Product Journey: {product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Product Overview */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Batch Number</p>
                <p className="text-lg font-semibold text-gray-900">{product.batchNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Origin</p>
                <p className="text-lg font-semibold text-gray-900">{product.origin.farm}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Stage</p>
                <p className="text-lg font-semibold text-gray-900">{formatStage(product.currentStage)}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Supply Chain Journey</h3>
            
            {/* Timeline Line */}
            <div className="absolute left-8 top-16 bottom-8 w-0.5 bg-gray-200"></div>

            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={event.id} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white ${getStageColor(event.stage)} shadow-sm`}></div>
                  
                  {/* Event Content */}
                  <div className="ml-16 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold text-gray-900">{formatStage(event.stage)}</h4>
                      <span className="text-sm text-gray-500">
                        {event.timestamp.toLocaleDateString()} {event.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {event.responsibleParty}
                      </div>
                    </div>

                    {(event.temperature || event.humidity) && (
                      <div className="flex items-center space-x-4 mb-3">
                        {event.temperature && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Thermometer className="h-4 w-4 mr-2" />
                            {event.temperature}°C
                          </div>
                        )}
                        {event.humidity && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Droplets className="h-4 w-4 mr-2" />
                            {event.humidity}% RH
                          </div>
                        )}
                      </div>
                    )}

                    {event.notes && (
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        {event.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Future Stages */}
              {stageOrder.map((stage, index) => {
                const hasEvent = events.some(e => e.stage === stage);
                const isCurrentStage = product.currentStage === stage;
                const isPastStage = stageOrder.indexOf(product.currentStage) > index;
                
                if (hasEvent || isPastStage) return null;

                return (
                  <div key={stage} className="relative flex items-start opacity-50">
                    <div className={`absolute left-6 w-4 h-4 rounded-full border-2 border-white bg-gray-300 ${isCurrentStage ? 'animate-pulse bg-blue-400' : ''}`}></div>
                    <div className="ml-16 bg-gray-50 border border-gray-200 rounded-lg p-4 w-full">
                      <h4 className="text-base font-medium text-gray-600">{formatStage(stage)}</h4>
                      <p className="text-sm text-gray-500">
                        {isCurrentStage ? 'Currently at this stage' : 'Upcoming stage'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
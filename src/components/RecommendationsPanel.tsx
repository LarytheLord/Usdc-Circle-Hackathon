'use client';

import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

interface Recommendation {
  id: string;
  name: string;
  description: string;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface RecommendationsPanelProps {
  recommendations: Recommendation[];
  onExecute: (strategy: Recommendation) => void;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ 
  recommendations, 
  onExecute 
}) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-900/30 text-green-400';
      case 'medium': return 'bg-amber-900/30 text-amber-400';
      case 'high': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  const getRiskBorder = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'border-green-900/50';
      case 'medium': return 'border-amber-900/50';
      case 'high': return 'border-red-900/50';
      default: return 'border-gray-700';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <LightBulbIcon className="h-5 w-5 text-amber-400 mr-2" />
        <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
      </div>
      
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div 
              key={recommendation.id} 
              className={`p-4 rounded-xl border ${getRiskBorder(recommendation.riskLevel)} bg-gradient-card transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-bold text-white mr-2">{recommendation.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(recommendation.riskLevel)}`}>
                      {recommendation.riskLevel} risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{recommendation.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">
                      Expected APY: 
                      <span className={`ml-1 font-bold ${
                        recommendation.expectedReturn > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {recommendation.expectedReturn > 0 
                          ? `+${(recommendation.expectedReturn * 100).toFixed(1)}%` 
                          : `${(recommendation.expectedReturn * 100).toFixed(1)}%`}
                      </span>
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => onExecute(recommendation)}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Execute
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No recommendations available at this time.</p>
          <p className="text-sm text-gray-500 mt-2">AI is analyzing market conditions...</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;
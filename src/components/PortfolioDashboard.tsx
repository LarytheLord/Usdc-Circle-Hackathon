'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ArrowTrendingUpIcon, CurrencyDollarIcon, BanknotesIcon } from '@heroicons/react/24/outline';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioDashboardProps {
  portfolio: any;
}

const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ portfolio }) => {
  if (!portfolio) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Portfolio Dashboard</h2>
        <p className="text-gray-400">Loading portfolio data...</p>
      </div>
    );
  }

  // Prepare data for the pie chart
  const pieData = {
    labels: portfolio.activeStrategies?.map((s: any) => s.name) || ['Cash'],
    datasets: [
      {
        data: portfolio.activeStrategies?.map((s: any) => s.invested) || [portfolio.usdcBalance],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue-500
          'rgba(16, 185, 129, 0.8)', // green-500
          'rgba(245, 158, 11, 0.8)', // amber-50
          'rgba(139, 92, 246, 0.8)', // violet-500
          'rgba(236, 72, 153, 0.8)', // pink-500
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#9CA3AF', // gray-40
          font: {
            size: 12
          }
        }
      },
    },
  };

  return (
    <div>
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-card rounded-xl p-5 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 bg-blue-900/30 rounded-lg mr-4">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-white">${portfolio.totalValue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      
        <div className="bg-gradient-card rounded-xl p-5 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 bg-green-900/30 rounded-lg mr-4">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">USDC Balance</p>
              <p className="text-2xl font-bold text-white">${portfolio.usdcBalance?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      
        <div className="bg-gradient-card rounded-xl p-5 border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 bg-amber-900/30 rounded-lg mr-4">
              <BanknotesIcon className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Strategies</p>
              <p className="text-2xl font-bold text-white">{portfolio.activeStrategies?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Portfolio Allocation Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Portfolio Allocation</h3>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
          <div className="h-64">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
      
      {/* Active Strategies */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Active Strategies</h3>
        <div className="space-y-4">
          {portfolio.activeStrategies?.map((strategy: any, index: number) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-bold text-white mr-2">{strategy.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      strategy.riskLevel === 'low' ? 'bg-green-900/30 text-green-400' : 
                      strategy.riskLevel === 'medium' ? 'bg-amber-900/30 text-amber-40' : 
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {strategy.riskLevel} risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{strategy.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">APY: <span className="text-green-400 font-medium">{strategy.apy}%</span></span>
                    <span>Invested: <span className="text-white font-medium">${strategy.invested?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-white mb-1">{strategy.apy}%</div>
                  <div className="text-xs text-gray-400">APY</div>
                </div>
              </div>
              
              <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    strategy.riskLevel === 'low' ? 'bg-green-500' : 
                    strategy.riskLevel === 'medium' ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, strategy.apy)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
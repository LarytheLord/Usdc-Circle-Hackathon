'use client';

import { useState, useEffect } from 'react';
import PortfolioDashboard from '@/components/PortfolioDashboard';
import RecommendationsPanel from '@/components/RecommendationsPanel';
import VoiceControlPanel from '@/components/VoiceControlPanel';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userAccount, setUserAccount] = useState<any>(null);

  useEffect(() => {
    // Initialize the app
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Simulate wallet connection using Circle Dev Wallet tools concept
      setIsConnected(true);
      
      // Get user account data
      const accountResponse = await fetch('/api/account');
      if (accountResponse.ok) {
        const accountData = await accountResponse.json();
        setUserAccount(accountData);
        setWalletAddress(accountData.walletAddress);
      }
      
      // Get wallet data
      const walletResponse = await fetch('/api/wallet');
      if (walletResponse.ok) {
        const walletData = await walletResponse.json();
        setWalletAddress(walletData.address);
      }
      
      // Fetch initial portfolio data from API
      const portfolioResponse = await fetch('/api/blockchain/portfolio');
      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        setPortfolio(portfolioData);
      }
      
      // Generate initial AI recommendations
      const recommendationsResponse = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          portfolio: portfolioData, 
          riskTolerance: userAccount?.preferences?.riskTolerance || 'medium' 
        })
      });
      
      if (recommendationsResponse.ok) {
        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData);
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteStrategy = async (strategy: any) => {
    try {
      // Execute strategy via API (simulated with wallet API)
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'simulate_transaction',
          parameters: { 
            ...strategy,
            amount: strategy.invested || 50
          }
        })
      });
      
      if (response.ok) {
        // Refresh portfolio after execution
        const updatedPortfolio = await response.json();
        setPortfolio(updatedPortfolio);
        
        // Refresh recommendations after strategy execution
        const recommendationsResponse = await fetch('/api/ai/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            portfolio: updatedPortfolio, 
            riskTolerance: userAccount?.preferences?.riskTolerance || 'medium' 
          })
        });
        
        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          setRecommendations(recommendationsData);
        }
      }
    } catch (error) {
      console.error('Error executing strategy:', error);
    }
  };

  const handleUpdatePreferences = async (newPreferences: any) => {
    try {
      // Update user preferences
      const response = await fetch('/api/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: newPreferences })
      });
      
      if (response.ok) {
        const updatedAccount = await response.json();
        setUserAccount(prev => ({
          ...prev,
          preferences: updatedAccount.account.preferences
        }));
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-2 border-arc-blue mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Initializing AI Yield Optimizer</h2>
          <p className="text-gray-400">Preparing your intelligent yield farming experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                AI Yield Optimizer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Live</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isConnected ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-red-900/50 text-red-400 border border-red-800'
              }`}>
                {isConnected ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    Connected to Arc
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    Not Connected
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">AI-Powered Yield Optimization</h2>
          <p className="text-gray-400">Your intelligent agent is analyzing market conditions to maximize your returns</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Dashboard */}
          <div className="lg:col-span-2">
            <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Portfolio Overview</h3>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                    24h
                  </button>
                  <button className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                    7d
                  </button>
                  <button className="text-xs px-3 py-1 bg-blue-900/50 text-blue-300 rounded-lg border border-blue-800">
                    30d
                  </button>
                </div>
              </div>
              <PortfolioDashboard portfolio={portfolio} />
            </div>
          </div>

          {/* Account Management and Recommendations */}
          <div className="space-y-6">
            <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-arc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Account Management
              </h3>
              {userAccount ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="text-white font-medium">{userAccount.username}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Wallet Address</p>
                    <p className="text-white font-mono text-sm truncate">{userAccount.walletAddress}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Risk Tolerance</p>
                    <p className="text-white font-medium capitalize">{userAccount.preferences?.riskTolerance || 'medium'}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="text-sm text-gray-400">Last Login</p>
                    <p className="text-white font-medium">{new Date(userAccount.lastLogin).toLocaleDateString()}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400">Loading account information...</p>
                </div>
              )}
            </div>
            
            <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-arc-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707m2.828 9.9a5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                AI Recommendations
              </h3>
              <RecommendationsPanel 
                recommendations={recommendations} 
                onExecute={handleExecuteStrategy} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-800 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">AI-Powered Predictive DeFi Yield Optimizer v1.0</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
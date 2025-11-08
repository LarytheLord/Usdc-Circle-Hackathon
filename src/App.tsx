import React, { useState, useEffect } from 'react';
import './App.css';
import { ArcBlockchainService } from './services/arc-blockchain-service';
import { SimpleAIEngine } from './ai/simple-ai-engine';
import { VoiceCommandProcessor } from './voice/voice-command-processor';
import PortfolioDashboard from './components/PortfolioDashboard';
import RecommendationsPanel from './components/RecommendationsPanel';
import VoiceControlPanel from './components/VoiceControlPanel';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

 const arcService = new ArcBlockchainService();
  const aiEngine = new SimpleAIEngine();
  const voiceProcessor = new VoiceCommandProcessor();

  useEffect(() => {
    // Initialize the app
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize blockchain service
      await arcService.connectWallet();
      setIsConnected(true);
      
      // Fetch initial portfolio data
      const initialPortfolio = await arcService.getPortfolio();
      setPortfolio(initialPortfolio);
      
      // Get initial AI recommendations
      const initialRecommendations = aiEngine.getRecommendations(initialPortfolio);
      setRecommendations(initialRecommendations);
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setIsLoading(false);
    }
  };

 const handleExecuteStrategy = async (strategy: any) => {
    try {
      await arcService.executeStrategy(strategy);
      // Refresh portfolio after execution
      const updatedPortfolio = await arcService.getPortfolio();
      setPortfolio(updatedPortfolio);
    } catch (error) {
      console.error('Error executing strategy:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-arc-blue mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Initializing AI Yield Optimizer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-arc-blue">
            AI-Powered Predictive DeFi Yield Optimizer
          </h1>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? 'Connected to Arc' : 'Not Connected'}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Dashboard */}
          <div className="lg:col-span-2">
            <PortfolioDashboard portfolio={portfolio} />
          </div>

          {/* Voice Control and Recommendations */}
          <div className="space-y-6">
            <VoiceControlPanel 
              voiceProcessor={voiceProcessor} 
              onCommandProcessed={(result) => console.log(result)}
            />
            <RecommendationsPanel 
              recommendations={recommendations} 
              onExecute={handleExecuteStrategy} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
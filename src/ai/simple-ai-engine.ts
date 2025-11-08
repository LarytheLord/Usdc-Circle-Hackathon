export interface Strategy {
  id: string;
  name: string;
  description: string;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  action?: () => void;
}

export interface MarketCondition {
  trend: 'bullish' | 'bearish' | 'stable';
  volatility: 'low' | 'medium' | 'high';
  volume: 'high' | 'medium' | 'low';
}

export class SimpleAIEngine {
  getRecommendations(currentPortfolio: any): Strategy[] {
    // Simple rule-based AI instead of complex ML models
    const marketCondition = this.assessMarket();
    const strategies: Strategy[] = [];
    
    // Determine the user's risk tolerance based on their current portfolio
    const riskTolerance = this.assessUserRiskTolerance(currentPortfolio);
    
    // Generate recommendations based on market conditions and user risk tolerance
    if (marketCondition.trend === 'bullish' && riskTolerance === 'high') {
      strategies.push({
        id: 'aggressive-yield-1',
        name: 'Aggressive Yield Farming',
        description: 'High yield farming with 15-18% APY potential in bullish market',
        expectedReturn: 0.165,
        riskLevel: 'high'
      });
    } else if (marketCondition.trend === 'bullish' && riskTolerance === 'medium') {
      strategies.push({
        id: 'balanced-yield-1',
        name: 'Balanced Yield Optimization',
        description: 'Moderate risk with diversified yield farming in bullish market',
        expectedReturn: 0.115,
        riskLevel: 'medium'
      });
    } else if (marketCondition.trend === 'stable' && riskTolerance === 'medium') {
      strategies.push({
        id: 'stable-yield-1',
        name: 'Conservative Yield Farming',
        description: 'Low-risk strategy focusing on stablecoin yield farming',
        expectedReturn: 0.075,
        riskLevel: 'low'
      });
    } else if (marketCondition.trend === 'bearish' && riskTolerance === 'low') {
      strategies.push({
        id: 'safe-harbor-1',
        name: 'Safe Harbor Strategy',
        description: 'Move funds to low-risk stablecoin positions during market downturn',
        expectedReturn: 0.035,
        riskLevel: 'low'
      });
    }
    
    // Add a diversification strategy regardless of market conditions
    strategies.push({
      id: 'diversification-1',
      name: 'Portfolio Diversification',
      description: 'Spread investments across multiple yield farming protocols',
      expectedReturn: 0.095,
      riskLevel: 'medium'
    });
    
    return strategies;
  }
  
  assessMarket(): MarketCondition {
    // Simple market assessment based on simulated data
    // In a real implementation, this would use real market data
    const trends: ('bullish' | 'bearish' | 'stable')[] = ['bullish', 'stable', 'bearish'];
    const volatilities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
    const volumes: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    
    // For demo purposes, randomly select market conditions
    // In a real implementation, this would analyze real market data
    const randomTrend = trends[Math.floor(Math.random() * trends.length)];
    const randomVolatility = volatilities[Math.floor(Math.random() * volatilities.length)];
    const randomVolume = volumes[Math.floor(Math.random() * volumes.length)];
    
    return {
      trend: randomTrend,
      volatility: randomVolatility,
      volume: randomVolume
    };
  }
  
  assessUserRiskTolerance(currentPortfolio: any): 'low' | 'medium' | 'high' {
    // Simple risk tolerance assessment based on portfolio composition
    // In a real implementation, this would use more sophisticated analysis
    
    // If the user has a high percentage in high-risk strategies, they might be high-risk tolerant
    if (currentPortfolio && currentPortfolio.activeStrategies) {
      const highRiskCount = currentPortfolio.activeStrategies.filter(
        (s: any) => s.riskLevel === 'high'
      ).length;
      
      if (highRiskCount > currentPortfolio.activeStrategies.length * 0.5) {
        return 'high';
      } else if (highRiskCount > 0) {
        return 'medium';
      }
    }
    
    // Default to medium risk tolerance
    return 'medium';
  }
  
  predictMarketMovement(): { direction: 'up' | 'down' | 'neutral'; confidence: number } {
    // Simple prediction model for demo purposes
    const directions: ('up' | 'down' | 'neutral')[] = ['up', 'down', 'neutral'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const confidence = Math.random() * 0.4 + 0.3; // Between 30% and 70% confidence
    
    return {
      direction: randomDirection,
      confidence: parseFloat(confidence.toFixed(2))
    };
  }
}
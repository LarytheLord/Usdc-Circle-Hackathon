import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { command } = body;

    // In a real implementation, this would process the command with NLP and execute actions
    // For now, returning a more robust response based on command analysis
    const processedCommand = await processVoiceCommand(command);

    return NextResponse.json(processedCommand);
  } catch (error) {
    console.error('Error processing voice command:', error);
    return NextResponse.json(
      { error: 'Failed to process voice command' }, 
      { status: 500 }
    );
  }
}

async function processVoiceCommand(command: string) {
  command = command.toLowerCase().trim();
  
  // Enhanced command processing with better context awareness
  if (includesAny(command, ['portfolio', 'balance', 'holding', 'show', 'my'])) {
    return {
      type: 'portfolio_query',
      message: 'Retrieving your portfolio information...',
      action: 'fetch_portfolio',
      priority: 'high'
    };
  } else if (includesAny(command, ['recommend', 'suggest', 'advice', 'idea', 'strategy'])) {
    return {
      type: 'recommendation_request',
      message: 'Analyzing market conditions and generating personalized recommendations...',
      action: 'generate_recommendations',
      priority: 'high'
    };
  } else if (includesAny(command, ['transfer', 'send', 'invest', 'execute', 'deploy'])) {
    return {
      type: 'transaction_request',
      message: 'Preparing to execute transaction based on your request...',
      action: 'prepare_transaction',
      priority: 'critical'
    };
  } else if (includesAny(command, ['yield', 'earnings', 'profit', 'returns', 'performance'])) {
    return {
      type: 'yield_query',
      message: 'Checking your current yield performance and earnings...',
      action: 'fetch_yield_data',
      priority: 'medium'
    };
  } else if (includesAny(command, ['hello', 'hi', 'hey', 'greetings'])) {
    return {
      type: 'greeting',
      message: 'Hello! I\'m your AI yield optimizer. I can help you check your portfolio, get recommendations, or execute strategies. What would you like to do?',
      action: 'none',
      priority: 'low'
    };
  } else if (includesAny(command, ['how', 'doing', 'today', 'going'])) {
    return {
      type: 'status_query',
      message: 'Your portfolio is currently generating an average yield of 12.5% APY across all active strategies. Your USDC balance is $1,250.75, with total value at $1,542.30.',
      action: 'fetch_status',
      priority: 'medium'
    };
  } else if (includesAny(command, ['market', 'condition', 'trend', 'news'])) {
    return {
      type: 'market_analysis',
      message: 'Current market conditions show moderate volatility with bullish sentiment. Recommended action: maintain balanced portfolio with 40% in conservative strategies and 60% in growth-oriented strategies.',
      action: 'fetch_market_analysis',
      priority: 'high'
    };
  } else if (includesAny(command, ['risk', 'exposure', 'safe', 'secure'])) {
    return {
      type: 'risk_assessment',
      message: 'Performing risk assessment of your current portfolio allocation...',
      action: 'assess_risk',
      priority: 'high'
    };
  } else {
    // Use AI to classify unknown commands
    const classification = classifyCommand(command);
    
    return {
      type: 'unknown',
      message: `I heard "${command}", but I'm not sure how to help with that. Try asking about your portfolio, recommendations, market conditions, or to execute a strategy.`,
      action: 'none',
      priority: 'low',
      suggestedActions: classification.suggestedActions
    };
  }
}

// Helper function to check if command includes any of the specified keywords
function includesAny(command: string, keywords: string[]): boolean {
  return keywords.some(keyword => command.includes(keyword));
}

// Helper function to classify unknown commands and suggest actions
function classifyCommand(command: string): { suggestedActions: string[] } {
  // Simple keyword-based classification - in a real implementation, this would use NLP/AI
  const suggestions: string[] = [];
  
  if (command.includes('portf')) suggestions.push('Check portfolio', 'Show balance');
  if (command.includes('recomm')) suggestions.push('Get recommendations', 'Suggest strategies');
  if (command.includes('transac') || command.includes('buy') || command.includes('sell')) suggestions.push('Execute transaction', 'Transfer funds');
  if (command.includes('yield') || command.includes('earn')) suggestions.push('Check earnings', 'Show performance');
  if (command.includes('market') || command.includes('condit')) suggestions.push('Market analysis', 'Check trends');
  
  if (suggestions.length === 0) {
    suggestions.push('Check portfolio', 'Get recommendations', 'Market analysis');
  }
  
  return { suggestedActions: suggestions };
}
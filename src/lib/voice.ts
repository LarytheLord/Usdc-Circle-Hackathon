export class VoiceCommandProcessor {
  private recognition: any;
 private isListening: boolean = false;
  private onResultCallback: ((result: string) => void) | null = null;

 constructor() {
    // Use browser's Web Speech API for recognition
    const SpeechRecognition = (window as any).SpeechRecognition || 
                             (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript;
        console.log('Voice command recognized:', command);
        if (this.onResultCallback) {
          this.onResultCallback(command);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Voice recognition error:', event.error);
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    } else {
      console.warn('Web Speech API not supported in this browser');
    }
  }

  startListening(onResult: (result: string) => void): boolean {
    if (!this.recognition) {
      console.error('Speech recognition not available');
      return false;
    }

    if (this.isListening) {
      console.warn('Already listening');
      return false;
    }

    this.onResultCallback = onResult;
    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      return false;
    }
  }

 stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  async processCommand(command: string): Promise<any> {
    // Simple command parsing
    command = command.toLowerCase();
    
    if (command.includes('portfolio') || command.includes('balance')) {
      return {
        type: 'portfolio_query',
        message: 'Retrieving your portfolio information...'
      };
    } else if (command.includes('recommend') || command.includes('suggest')) {
      return {
        type: 'recommendation_request',
        message: 'Analyzing market conditions and generating recommendations...'
      };
    } else if (command.includes('transfer') || command.includes('send') || command.includes('invest')) {
      return {
        type: 'transaction_request',
        message: 'Initiating transaction based on your request...'
      };
    } else if (command.includes('yield') || command.includes('earnings')) {
      return {
        type: 'yield_query',
        message: 'Checking your current yield and earnings...'
      };
    } else if (command.includes('hello') || command.includes('hi')) {
      return {
        type: 'greeting',
        message: 'Hello! I\'m your AI yield optimizer. How can I help you today?'
      };
    } else {
      return {
        type: 'unknown',
        message: `I heard "${command}", but I'm not sure how to help with that. Try asking about your portfolio, recommendations, or transactions.`
      };
    }
  }
}
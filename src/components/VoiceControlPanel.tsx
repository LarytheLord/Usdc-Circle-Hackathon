'use client';

import React, { useState } from 'react';
import { MicrophoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface VoiceControlPanelProps {
  onCommandProcessed: (result: any) => void;
}

const VoiceControlPanel: React.FC<VoiceControlPanelProps> = ({ 
  onCommandProcessed 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      // Stop listening using browser API
      if ((window as any).recognition) {
        (window as any).recognition.stop();
      }
      setIsListening(false);
    } else {
      setIsListening(true);
      setResponse('Listening...');
      
      // Start speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = async (event: any) => {
          const result = event.results[0][0].transcript;
          setTranscript(result);
          setIsProcessing(true);
          
          try {
            // Simulate processing the command (no external services needed)
            // In a real implementation, this would use Cloudflare Workers AI or other free services
            const mockProcessedResult = {
              type: 'voice_processed',
              message: `I heard: "${result}". This is a simulated response using free resources.`,
              action: 'simulated_voice_action',
              timestamp: new Date().toISOString()
            };
            
            setResponse(mockProcessedResult.message);
            onCommandProcessed(mockProcessedResult);
          } catch (error) {
            console.error('Error processing voice command:', error);
            setResponse('Sorry, I encountered an error processing your command.');
          } finally {
            setIsProcessing(false);
            setIsListening(false);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setResponse('Sorry, I could not understand your command.');
          setIsProcessing(false);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        (window as any).recognition = recognition; // Store for later use
        recognition.start();
      } else {
        setResponse('Speech recognition is not supported in this browser.');
        setIsListening(false);
      }
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Voice Control</h2>
      
      <div className="mb-6">
        <button
          onClick={toggleListening}
          className={`flex items-center justify-center w-full py-3 px-4 rounded-xl text-white font-medium ${
            isListening 
              ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
          } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl`}
        >
          {isListening ? (
            <>
              <MicrophoneIcon className="h-5 w-5 mr-2" />
              Stop Listening
            </>
          ) : (
            <>
              <MicrophoneIcon className="h-5 w-5 mr-2" />
              Start Voice Command
            </>
          )}
        </button>
      </div>
      
      {transcript && (
        <div className="mb-4 p-3 bg-blue-900/30 rounded-xl border border-blue-800/50">
          <p className="text-sm font-medium text-blue-400">You said:</p>
          <p className="text-gray-200">{transcript}</p>
        </div>
      )}
      
      {(response || isProcessing) && (
        <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="flex items-start">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-400">AI Response:</p>
              <p className="text-gray-200">
                {isProcessing ? 'Processing your command...' : response}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-400">
              <strong>Tip:</strong> Try saying things like "Show my portfolio", "What are your recommendations?", or "How am I doing today?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceControlPanel;
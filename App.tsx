
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, MessageRole, Source } from './types';
import { askSamarth } from './services/geminiService';
import { SAMPLE_QUESTIONS } from './constants';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import InputForm from './components/InputForm';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const welcomeMessage: ChatMessage = {
    role: MessageRole.MODEL,
    text: "Hello! I am Samarth, an AI assistant for analyzing India's agricultural and climate data. How can I help you today? You can ask me a question or try one of the samples below.",
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: MessageRole.USER, text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await askSamarth(text);
      const modelMessage: ChatMessage = {
        role: MessageRole.MODEL,
        text: response.text,
        sources: response.sources,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      const errorResponse: ChatMessage = {
        role: MessageRole.MODEL,
        text: `I apologize, but I encountered an error: ${errorMessage}`
      }
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-brand-light font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center py-4 md:py-8 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col bg-white shadow-2xl rounded-lg border border-gray-200">
          <ChatInterface 
            messages={messages.length > 0 ? messages : [welcomeMessage]} 
            isLoading={isLoading} 
          />
          <div className="p-4 border-t border-gray-200">
             {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
             <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                {SAMPLE_QUESTIONS.map((q, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSendMessage(q)}
                        disabled={isLoading}
                        className="text-left text-sm p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-brand-secondary"
                    >
                        {q.substring(0, 80)}...
                    </button>
                ))}
             </div>
             <InputForm onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
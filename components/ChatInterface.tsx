
import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from './ChatMessage';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
      {isLoading && (
        <div className="flex items-center space-x-3 justify-start">
            <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-1.414-8.414L16 8m-8.414 6.586L8 16"></path></svg>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse delay-150"></div>
                    <p className="text-sm text-gray-600">Samarth is thinking...</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

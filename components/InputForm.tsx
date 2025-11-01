
import React, { useState, FormEvent } from 'react';

interface InputFormProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question about Indian agriculture and climate..."
        disabled={isLoading}
        className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-accent focus:outline-none transition-shadow duration-200 disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-brand-accent text-white rounded-full p-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </form>
  );
};

export default InputForm;

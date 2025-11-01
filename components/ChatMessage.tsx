import React from 'react';
import { ChatMessage, MessageRole } from '../types';
import { marked } from 'marked';

interface ChatMessageProps {
  message: ChatMessage;
}

const UserAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-brand-secondary text-white flex items-center justify-center font-bold flex-shrink-0">
        U
    </div>
);

const ModelAvatar: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center flex-shrink-0">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 8l1.414-1.414M14.586 14.586L16 16m-1.414-8.414L16 8m-8.414 6.586L8 16"></path></svg>
    </div>
);

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;
  const rawMarkup = marked.parse(message.text);

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && <ModelAvatar />}
      
      <div className={`flex flex-col max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${isUser ? 'bg-brand-accent text-white rounded-br-none' : 'bg-gray-100 text-brand-primary rounded-bl-none'}`}>
          <div
            className="prose prose-sm max-w-none prose-p:my-2 prose-headings:my-3 prose-table:my-3 prose-table:w-full prose-th:bg-gray-200 prose-th:p-2 prose-td:p-2 prose-td:border prose-tr:border [&_th]:!text-brand-primary [&_td]:!text-brand-primary"
            dangerouslySetInnerHTML={{ __html: rawMarkup as string }}
          />
        </div>
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 text-xs text-gray-500 w-full">
            <h4 className="font-bold mb-1">Sources:</h4>
            <ul className="space-y-1 list-disc list-inside">
              {message.sources.map((source, index) => (
                <li key={index} className="truncate">
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                    title={source.uri}
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isUser && <UserAvatar />}
    </div>
  );
};

export default ChatMessageComponent;
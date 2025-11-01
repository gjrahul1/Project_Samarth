
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <h1 className="text-2xl font-bold">Project Samarth</h1>
        <p className="text-sm text-gray-300">Intelligent Q&A for Indian Agricultural & Climate Data</p>
      </div>
    </header>
  );
};

export default Header;

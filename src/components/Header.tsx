import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container mx-auto px-4">
        <nav className="nav-links">
          <a href="/" className="text-white py-2 px-4 hover:text-gray-300">Home</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

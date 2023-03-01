import React from "react";


const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-full h-16 bg-gray-800 text-white px-4 py-10 mb-8 sticky top-0">
      <div className="flex items-center">
        <h1 className="font-bold text-5xl py-8">FlowX</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">About</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

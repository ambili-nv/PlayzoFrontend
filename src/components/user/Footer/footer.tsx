import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6 mt-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="src/assets/images/logo.png" alt="playZo" className="h-8 ml-5" />
          {/* <span className="text-lg font-semibold">playZo</span> */}
        </div>
        <ul className="flex space-x-6 mt-4 md:mt-0 mr-5">
          <li>
            <a href="#" className="text-gray-400 hover:text-white">About</a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-white">Contact</a>
          </li>
        </ul>
      </div>
      <div className="container mx-auto mt-4 border-t border-gray-500 pt-4 text-center text-gray-500">
        © 2024 playZo™. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <div className="text-9xl font-bold text-red-500">404</div>
        <div className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page not found
        </div>
        <p className="mt-2 text-gray-500">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

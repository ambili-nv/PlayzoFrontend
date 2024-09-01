import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSearch}>
      <div className="relative mt-[100px]">
        <input
          type="text"
          className="w-full h-14 px-6 py-4 pr-16 border border-gray-300 rounded-2xl shadow-lg  outline-none"
          placeholder="Enter the location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;















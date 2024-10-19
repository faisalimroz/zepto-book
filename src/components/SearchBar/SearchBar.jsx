import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search books by title..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
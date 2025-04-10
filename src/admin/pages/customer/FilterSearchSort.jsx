import React, { useState } from 'react';

// Reusable component
const FilterSearchSort = ({
  filterOptions,
  sortOptions,
  onFilterChange,
  onSearchChange,
  onSortChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <div className="w-full flex justify-between items-center p-4 border-b">
 
      <select
        className="border p-2 rounded min-w-[150px] text-center text-blue-500 border-blue-500 rounded-md"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-1/3 border border-gray-400 p-2 rounded placeholder:text-center"
      />

      <select
        className="border p-2 rounded min-w-[150px] text-center text-blue-500 border-blue-500 rounded-md"
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSearchSort;

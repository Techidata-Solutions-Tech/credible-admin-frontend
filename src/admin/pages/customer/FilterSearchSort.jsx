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
      {/* Filter Dropdown */}
      <select
        className="border p-2 rounded"
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {filterOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-1/3 border border-gray-400 p-2 rounded"
      />

      {/* Sort Dropdown */}
      <select
        className="border p-2 rounded"
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

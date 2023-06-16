import React from "react";

const ProductFilter = ({ onSelectFilter, onSearch }) => {
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setTimeout(() => {
      onSelectFilter(selectedFilter);
    }, 1000);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setTimeout(() => {
      onSearch(searchText);
    }, 1000);
  };

  return (
    <div className="product-filter d-flex flex-col justify-content-between align-items-center">
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <div className="mt-2">
        <label htmlFor="filter">Filter by:</label>
        <select id="filter" onChange={handleFilterChange}>
          <option value="">Select Filter</option>
          <option value="atoz">A to Z</option>
          <option value="ztoa">Z to A</option>
          <option value="lowtohigh">Price Low to High</option>
          <option value="hightolow">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;

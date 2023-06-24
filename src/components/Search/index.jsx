import "./Search.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search({
  allCategories,
  searchText,
  onSearchTextChange,
  onProductSearch,
  onCategoryChange,
  categoryId,
}) {
  return (
    <div className="amazon__search d-flex align-items-center">
      {/* category filter */}
      <div className="filter-container">
        <select
          id="filter"
          onChange={(e) => onCategoryChange(e.target.value)}
          value={categoryId}
        >
          <option value="">All</option>
          {allCategories &&
            allCategories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.title}
              </option>
            ))}
        </select>
      </div>

      {/* search bar */}
      <div className="search__container d-flex">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
        <button
          className="search__btn"
          onClick={onProductSearch}
          disabled={searchText === ""}
        >
          <AiOutlineSearch size={26} />
        </button>
      </div>
    </div>
  );
}

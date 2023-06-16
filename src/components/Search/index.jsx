import "./Search.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function Search({ allCategories }) {
  return (
    <div className="amazon__search d-flex align-items-center">
      {/* category filter */}
      <div class="filter-container">
        <select id="filter">
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
      <div class="search__container d-flex">
        <input type="text" class="search__input" placeholder="Search" />
        <button class="search__btn">
          <AiOutlineSearch size={26} />
        </button>
      </div>
    </div>
  );
}

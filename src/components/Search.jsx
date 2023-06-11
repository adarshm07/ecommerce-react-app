import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="search-box d-flex gap-2">
      <input
        type="text"
        className="search-input form-control"
        placeholder="Search..."
      />
      <button
        className="btn btn-primary"
        onChange={(e) => setSearch(e.target.value)}
      >
        Search
      </button>
    </div>
  );
}

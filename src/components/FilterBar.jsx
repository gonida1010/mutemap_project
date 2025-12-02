import React from "react";

const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-buttons">
      <button
        onClick={() => onFilterChange("all")}
        className={currentFilter === "all" ? "active" : ""}
      >
        전체
      </button>
      <button
        onClick={() => onFilterChange("quiet")}
        className={currentFilter === "quiet" ? "active" : ""}
      >
        조용한 곳만
      </button>
      <button
        onClick={() => onFilterChange("socket")}
        className={currentFilter === "socket" ? "active" : ""}
      >
        콘센트 필수
      </button>
    </div>
  );
};

export default FilterBar;

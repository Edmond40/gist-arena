import React from 'react';


function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search news..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <span className="search-icon">🔍</span>
    </div>
  );
}

export default SearchBar;

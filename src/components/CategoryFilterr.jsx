import React from 'react';


function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-filter">
      <button
        className={!selected ? 'active' : ''}
        onClick={() => onSelect(null)}
      >All</button>
      {categories.map(cat => (
        <button
          key={cat}
          className={selected === cat ? 'active' : ''}
          onClick={() => onSelect(cat)}
        >{cat}</button>
      ))}
    </div>
  );
}

export default CategoryFilter;

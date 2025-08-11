import React from 'react';


function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="md:flex md:flex-row grid grid-cols-3 md:justify-center md:gap-4 bg-red-500 text-white p-2 w-full">
      <button
        className={!selected ? 'active bg-yellow-400 px-1 scale-110 duration-500 cursor-pointer' : 'cursor-pointer' }
        onClick={() => onSelect(null)}
      >All</button>
      {categories.map(cat => (
        <button
          key={cat}
          className={selected === cat ? 'active bg-yellow-400 px-1 scale-110 duration-500 cursor-pointer' : 'cursor-pointer'}
          onClick={() => onSelect(cat)}
        >{cat}</button>
      ))}
    </div>
  );
}

export default CategoryFilter;

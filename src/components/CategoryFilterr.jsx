import React from 'react';


function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex justify-center gap-4 bg-red-500 text-white p-0.5 w-full">
      <button
        className={!selected ? 'active bg-yellow-400 px-2 scale-110 duration-500 cursor-pointer' : 'cursor-pointer' }
        onClick={() => onSelect(null)}
      >All</button>
      {categories.map(cat => (
        <button
          key={cat}
          className={selected === cat ? 'active bg-yellow-400 px-2 scale-110 duration-500 cursor-pointer' : 'cursor-pointer'}
          onClick={() => onSelect(cat)}
        >{cat}</button>
      ))}
    </div>
  );
}

export default CategoryFilter;

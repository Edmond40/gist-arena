import { Search } from 'lucide-react';
import React from 'react';


function SearchBar({ value, onChange }) {
  return (
    <div className="text-white flex gap-3">
      <input
        type="text"
        placeholder="Search news..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-2 border-gray-200 p-2  rounded-full focus:outline-none focus:border-yellow-500 duration-300 text-gray-800"/>
      <Search size={40} className='border-2 p-1 rounded-xl bg-blue-400 hover:bg-blue-500 duration-300 cursor-pointer animate-pulse'/>
    </div>
  );
}

export default SearchBar;

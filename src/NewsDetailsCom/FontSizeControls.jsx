import React from 'react';
import { Type, Minus, RotateCcw } from 'lucide-react';

const FontSizeControls = ({ increaseFontSize, decreaseFontSize, resetFontSize }) => {
  return (
    <div className="fixed top-20 right-20 z-10 flex gap-1">
      <button
        onClick={decreaseFontSize}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors shadow-md"
        title="Decrease Font Size"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={resetFontSize}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors shadow-md"
        title="Reset Font Size"
      >
        <RotateCcw size={16} />
      </button>
      <button
        onClick={increaseFontSize}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors shadow-md"
        title="Increase Font Size"
      >
        <Type size={16} />
      </button>
    </div>
  );
};

export default FontSizeControls;

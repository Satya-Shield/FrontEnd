import React from 'react'
import { FaMicrophone, FaPlus } from 'react-icons/fa'
const SearchInput = ({ value, onChange, onSubmit }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && onSubmit) {
            onSubmit(value);
        }
    };

  return (
    <div className="flex justify-center">
        <div className="w-full max-w-3xl">
            <div className="dark:bg-gray-800 dark:border-gray-700 bg-opacity-80 backdrop-blur-lg rounded-2xl p-4 flex items-center space-x-4 shadow-2xl border border-white border-opacity-20">
                <div className="flex-shrink-0">
                    <FaPlus className="w-6 h-6 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder="Type Something..." 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onClick={handleKeyPress}
                    className="flex-1 bg-transparent text-white text-lg outline-none"
                />
                <div className="flex-shrink-0">
                    <FaMicrophone className="w-6 h-6 text-gray-400 cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
  );
};


export default SearchInput
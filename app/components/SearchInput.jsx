"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSearch }) => {
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    if (inputText.trim()) {
      onSearch(inputText);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full mt-8 px-6">
      {/* Box shifted left and limited max-width */}
      <div className="bg-gray-800 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Quick Fact Check 
        </h3>

        <div className="space-y-4">
          <textarea
            placeholder="Enter your claim here to verify..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full min-h-[110px] bg-black border border-gray-600 rounded-lg text-white placeholder:text-white-400 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Gradient theme button */}
          <button
            onClick={handleSearch}
            className="w-full flex items-center justify-center gap-2 bg-black hover:opacity-90 transition rounded py-3 text-base font-medium shadow-md text-white"
            
          >
            <FaSearch className="w-4 h-4" />
            Verify Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;

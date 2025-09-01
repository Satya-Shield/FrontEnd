"use client";

import React, { useState } from "react";
import { FaShieldAlt, FaSearch, FaSpinner } from "react-icons/fa";

const SearchInput = ({ onSearch, loading, searchQuery, setSearchQuery, selectedFile, selectedUrl, onClearFile, onClearUrl }) => {
  const [inputValue, setInputValue] = useState(searchQuery || "");

  const handleSubmit = (e) => {
    // console.log("Submit button was clicked")
    console.log('Submit button was clicked with the search data : ', e);
    // e doesnt show the things we have placed in the request 
    e.preventDefault();
    if(inputValue.trim() && !loading){
      const query = inputValue.trim();
        onSearch({
          query,
          file : selectedFile,
          url : selectedUrl
        });
        // setInputValue("")
        // if(setSearchQuery){
        //     setSearchQuery("")
        // }
    }
  }

  const handleInputChange = (e) =>{
    console.log("Handling input change")
    setInputValue(e.target.value);
    if(setSearchQuery){
        setSearchQuery(e.target.value);
    }
  }


  return (
    <div className="flex flex-col items-start justify-start w-full mt-8 px-6">
      <div className="bg-gray-800 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 w-full max-w-2xl shadow-lg">
        <div className="flex">
          <FaShieldAlt className="w-5 h-5 text-whiet-400 mr-2 mt-1" />
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Quick Fact Check 
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <textarea
                    placeholder="Enter your claim here to verify..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full min-h-[110px] bg-black border border-gray-600 rounded-lg text-white placeholder:text-white-400 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-black hover:opacity-90 transition rounded py-3 text-xl font-semibold shadow-md text-white">
                    {loading ? (
                        <div className="flex">
                            <FaSpinner className="w-4 h-4 animate-spin mt-1 mr-2" />
                            Verifying Claim...
                        </div>
                    ) : (
                        <div className="flex">
                            <FaSearch className="w-4 h-4 mt-1 mr-2" />
                            Verify Claim
                        </div>
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SearchInput;

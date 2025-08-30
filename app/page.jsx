"use client";

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import FeatureCards from "./components/FeatureCards.jsx";
import BackgroundEffects from "./components/BackgroundEffects";
import { FaSearch } from "react-icons/fa";
import SearchInput from "./components/SearchInput";
const Page = () => {    
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

    const handleSearch = (query) => {
      if (query.trim()) {
        setSearchQuery(query);
      }
    };

    const handleCardClick = (cardType) => {
      setSearchQuery(`${cardType} verification`);
      setCurrentPage("result");
    };


  return (
    <div className="bg-black flex flex-col items-center min-h-screen relative">
      <BackgroundEffects />
      <div className="relative overflow-hidden w-full">
        <LandingPage />
      </div>
      <div className="w-full flex justify-start px-6 z-10 relative">
          <SearchInput onSearch={handleSearch}/>
      </div>
     <div className="w-full flex justify-start px-6 z-10 relative">
        <FeatureCards />
      </div>
    </div>


  );
};

export default Page;

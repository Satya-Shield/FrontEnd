"use client";

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import SearchInput from "./components/SearchInput";
import FeatureCards from "./components/FeatureCards";
import Result from "./result/page";
import BackgroundEffects from "./components/BackgroundEffects";
const Page = () => {
    const [currentPage, setCurrentPage] = useState("landing");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
      if (query.trim()) {
        setSearchQuery(query);
        setCurrentPage("result");
      }
    };

    const handleCardClick = (cardType) => {
      setSearchQuery(`${cardType} verification`);
      setCurrentPage("result");
    };

    const handleBack = () => {
      setCurrentPage("landing");
      setSearchQuery("");
    };

    if(currentPage === "result") {
      return <Result query={searchQuery} onBack={handleBack} />;
      // Abhi onBack works a lil off can do better
    }

  return (
    <div className="bg-black flex flex-col items-center justify-center p-6 min-h-screen relative">
      <BackgroundEffects />
      <div className="w-full max-w-5xl mx-auto space-y-12 relative z-10">
        <LandingPage />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
        />
        <FeatureCards onCardClick={handleCardClick} />
        {/* Still need to handle for images and url  */}
      </div>
    </div>

  );
};

export default Page;

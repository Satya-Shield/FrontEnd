"use client"; 
import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import SearchInput from "./components/SearchInput";
import FeatureCards from "./components/FeatureCards";
// import ResultPage from "./components/ResultPage"; // when you build it

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

  if (currentPage === "result") {
    // return <ResultPage query={searchQuery} onBack={handleBack} />;
    return <div className="p-6">Results for: {searchQuery}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen">
      <div className="w-full max-w-5xl mx-auto space-y-12">
        <LandingPage />

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleSearch}
        />

        <FeatureCards/>
      </div>
    </div>
  );
};

export default Page;

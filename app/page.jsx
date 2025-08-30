"use client";

import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import FeatureCards from "./components/FeatureCards.jsx";
import BackgroundEffects from "./components/BackgroundEffects";
import BackendResponse from "./components/BackendResponse";
// import { FaSearch } from "react-icons/fa";
import SearchInput from "./components/SearchInput";

// TODO : 
// BRING IN AN ANIMATED EFFECT TO THE RESPONSE 
// MODIFY THE ICONS FOR THE SEARCH INPUT BAR 
// GET TO KNOW HOW ACTUALLY ARE WE PLANNING TO SEND IMAGE TO BACKEND 

const Page = () => {    
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState({
    claim: "Everything seen on the internet is true.",
    verdict: "False",
    confidence: 75,
    explanation:
      "False. The claim that everything on the internet is true is fundamentally incorrect. The internet is an open platform containing a vast mix of accurate information, opinions, satire, errors, and deliberate misinformation. The provided evidence ironically supports this verdict through satire. One source sarcastically states to believe everything [1], while another uses a fake Abraham Lincoln quote to demonstrate the absurdity of the claim [2]. The core principle of digital literacy is to critically evaluate, question, and verify information found online rather than accepting it at face value.",
    techniques: ["Cross-referencing", "Scientific consensus", "Source reliability"],
    sources: [
      "https://www.quora.com/Is-it-true-that-you-can-and-should-trust-everything-that-you-read-on-the-internet",
      "https://developersalliance.org/2019-11-18-everything-you-see-on-the-internet-is-true-abraham-lincoln/"
    ],
    techniques : [
      "Misleading context",
      "Cherry-picking",
      "Out-of-context imagery",
      "Emotional manipulation",
      "Statistical manipulation"
    ],
    checklist: [
      "Check if the source is peer-reviewed",
      "Look for scientific consensus",
      "Verify with health organizations"
    ]
  });

  const verifyAPI = async(query) => {
    setLoading(true);
    try{
      const res = await fetch('https://satyashield-backend-60le.onrender.com/api/run_agent',{
        method : 'POST', 
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          query : query
        })
      });

      if(!res.ok){
        throw new Error(`Error gaining response from /api/run_agent' ${response.status}`)
      }

      const data = await res.json();
      console.log(data[0])
      setJsonResponse(data[0]);
    }
    catch(err){
      console.err('Error hai code mei : ', err);
      setJsonResponse({
        claim : query,
        verdict : "Error",
        confidence : 0,
        explaination : "Okay! This is awkward...give us a few moments, we will be back!",
        techniques : [],
        sources : [],
        checklist : []
      });
    }
    finally{
      setLoading(false);
    }
  };

    const handleSearch = (query) => {
      if (query.trim()) {
        setSearchQuery(query);
        verifyAPI(query);
      }
    };

    const handleCardClick = (cardType) => {
      setSearchQuery(`${cardType} verification`);
    };


  return (
    <div className="bg-black flex flex-col items-center min-h-screen relative">
      <BackgroundEffects />
      <div className="relative overflow-hidden w-full">
        <LandingPage />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:items-start gap-8 px-6 z-10 relative">
        
        <div className="flex flex-col space-y-6 lg:w-1/2 mt-0">
          <div className="mt-0">
            <SearchInput onSearch={handleSearch} loading={loading} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          </div>
          <div className="mt-0">
            <FeatureCards onCardClick={handleCardClick} />
          </div>
        </div>

        <div className="flex justify-center lg:justify-start lg:w-1/2 mt-0 z-10">
          {jsonResponse && (
            <div className="mt-6">
              <BackendResponse jsonResponse={jsonResponse} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

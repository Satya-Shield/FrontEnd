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
// The icon near the verify claim needs to be fixed
// MODIFY THE ICONS FOR THE SEARCH INPUT BAR 
// GET TO KNOW HOW ACTUALLY ARE WE PLANNING TO SEND IMAGE TO BACKEND (seems to be an issue with cors, check that)
// Swictch confidence level from useeffect to usestate 
const Page = () => {    
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState('');
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
    console.log('Handling request for the basic query type');
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
        throw new Error(`Error gaining response from /api/run_agent ${response.status}`)
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
        explaination : "There has been an error from our end. We will be right back with your query verification!",
        techniques : [],
        sources : [],
        checklist : []
      });
    }
    finally{
      setLoading(false);
    }
  };

  const verifyImageAPI = async(file, query)=>{
    console.log('Handling request for the image');
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append('file', file);
      formData.append('query', query);

      const res = await fetch('https://satyashield-backend-60ie.onrender.com/api/read_image_file',{
        method : 'POST', 
        body : formData
      });

      if(!res.ok){
        throw new Error(`Error from handling image ${res.status}`);
      }

      const data = await res.json();
      console.log('From image verification', data[0]);
      setJsonResponse(data[0]);
    }catch(err){
      console.err('From image verification', err);

      setJsonResponse({
        claim : `Image verification, ${query}`,
        verdict : `Error`,
        confidence : 0,
        explanation : "There has been an error from our end. We will be right back with your image verification!",
        techniques : [],
        sources : [],
        checklist : []
      });
    }
    finally{
      setLoading(false);
    }
  }

  const verifyImageUrlAPI = async(imageUrl, query)=>{
    console.log('Sending request for the url');
    setLoading(true);
    try{
      const res = await fetch('https://satyashield-backend-60le.onrender.com/api/read_image_url',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          query : query,
          image : imageUrl
        })
      });

      if(!res.ok){
        throw new Error(`Error from image url handling ${res.status}`)
      }

      const data = await res.json();
      console.log('From url results', data[0]);
      setJsonResponse(data[0]);
    }catch(err){
      console.err('Error in URL verification', err);
      setJsonResponse({
        claim : `URL verification : ${query}`,
        verdict : `Error`,
        confidence : 0,
        explanation : "There has been some error from our end. We will be right back with your url verification!",
        techniques : [],
        sources : [],
        checklist : []
      });
    }finally{
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    console.log('Hello from handle search');
    const { query, file, url } = searchData;
      
    if (file){
      console.log('We will be verifying the image file');
      verifyImageAPI(file, query);
    } 
    else if (url){
      console.log('We will be verifying the url file');
      verifyImageUrlAPI(url, query);
    } 
    else {
      console.log("We will be verifiying the basic query type");
      verifyAPI(query);
    }
    setSearchQuery(query);
    
  };

  const handleFileSelect=(file)=>{
    console.log('hI');
    setSelectedFile(file);
    setSelectedUrl('');
    console.log('file selected');
  }

  const handleUrlSelect=(url)=>{
    console.log('inurl');
    setSelectedUrl(url);
    setSelectedFile(null);
    console.log('url has been selected');
  }

  const handleClearFile=()=>{
    setSelectedFile(null);
  }

  const handleClearUrl=()=>{
    setSelectedUrl('');
  }

  // const handleFeatureCardResult=(res)=>{
  //   console.log("from feature card")
  //   console.log(res);
  //   setJsonResponse(res);
  //   setLoading(false);
  // }

  // const handleFeatureCardLoading=(valbool)=>{
  //   setLoading(valbool)
  // }

  const handleCardClick=(type)=>{
    setSearchQuery(`${type} from the card click`);
  }



  return (
    <div className="bg-black flex flex-col items-center min-h-screen relative">
      <BackgroundEffects />
      <div className="relative overflow-hidden w-full">
        <LandingPage />
      </div>
      <div className="w-full flex flex-col lg:flex-row lg:items-start gap-8 px-6 z-10 relative">
        
        <div className="flex flex-col space-y-6 lg:w-1/2 mt-0">
          <div className="mt-0">
            <SearchInput onSearch={handleSearch} loading={loading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFile={selectedFile} selectedUrl={selectedUrl} onClearFile={handleClearFile} onClearUrl={handleClearUrl}/>
          </div>
          <div className="mt-0">
            <FeatureCards onCardClick={handleCardClick} onFileSelect={handleFileSelect} onUrlSelect={handleUrlSelect}/>
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

"use client";

import React, { useEffect, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import BackendResponse from "../components/BackendResponse";
// import QueryRepresentation from "../components/QueryRepresentation";


const Result = ({ query, onBack }) => {
  const [backendResponse, setBackendResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const messages = [
    {
      id : 1,
      text: query,
      isUser: true
    },
  ];

  useEffect(() => {
    if (!query) return;

    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://satyashield-backend-60le.onrender.com/api/run_agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setBackendResponse(data[0]); 
      } 
      catch (err) {
        console.error(err);
      } 
      finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Chat Opener */}
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${ message.isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start space-x-2 max-w-lg">
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm"><FaRobot/></span> 
                      {/* Abhi nahi aa raha hai, fix this! */}
                    </div>
                  )}
                  <div className="px-4 py-2 rounded-2xl  border-gray-900 bg-gray-700 text-white ml-2">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-4 h-4 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Query Representation */}
          {/* Abhi nahi chahiye when we up it we will see */}
          {/* <div className="flex justify-start">
            <div className="ml-10">
              <QueryRepresentation query={query} />
            </div>
          </div> */}

          {/* Backend Response */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex ml-10">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRobot className="w-4 h-4 text-gray-300" />
                </div>
                <div className= "border-gray-900 bg-gray-700 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    {/* <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div> */}
                    <span className="text-gray-300">Give us a moment we will check!</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {backendResponse && (
            <div className="flex justify-start">
              <div className="ml-10">
                <BackendResponse jsonResponse={backendResponse} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
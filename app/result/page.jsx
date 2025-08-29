"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import SearchInput from "../components/SearchInput";
import BackendResponse from "../components/BackendResponse";

const jsonResponse = [
  {
    claim: "Manushi Chillar is not Miss Universe",
    verdict: "true",
    confidence: 95,
    explanation:
      "The claim that Manushi Chhillar is not Miss Universe is supported by the evidence. Manushi Chhillar is widely recognized as the winner of the Miss World 2017 pageant, not Miss Universe. Both her biography on IMDb and her profile on BookMyShow explicitly state that she won the Miss World 2017 title after representing Haryana at the Femina Miss India 2017 pageant [1, 2]. She is the sixth Indian woman to have won the Miss World crown. Therefore, the distinction between Miss World and Miss Universe is crucial, and the claim correctly states she does not hold the Miss Universe title.",
    sources: [
      "https://www.imdb.com/name/nm10035940/bio/",
      "https://in.bookmyshow.com/person/manushi-chhillar/2015213",
    ],
    techniques: [],
    checklist: [
      "Always verify specific titles or awards, as different pageants exist (e.g., Miss World vs. Miss Universe).",
      "Consult multiple reputable biographical sources to confirm factual details.",
      "Pay attention to keywords and specific terms in claims to avoid confusion.",
    ],
  },
];

const Result = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      isValid: true,
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage = {
        isValid: true,
        id: (Date.now() + 1).toString(),
        text: `Based on my analysis, I need to verify this information. Please wait while I check multiple sources.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="w-full bg-card flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start space-x-2 max-w-xs">
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-sm">🤖</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? "bg-primary text-primary-foreground ml-2"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Fact-check response aligned mid-left */}
        <div className="p-4 flex justify-start">
          <div className="ml-16"> {/* push it slightly to the center-left */}
            <BackendResponse jsonResponse={jsonResponse} />
          </div>
        </div>

        <div className="mb-4">
          <SearchInput />
        </div>
      </div>
    </div>
  );
};

export default Result;

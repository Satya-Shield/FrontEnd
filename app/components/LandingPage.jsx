import React, { useState, useEffect } from 'react';

const words = ['photo', 'video', 'link'];

const LandingPage = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = words[currentWord];
    let timeout;

    if (typing) {
        if(displayText.length < current.length) {
            timeout = setTimeout(() => {
            setDisplayText(current.slice(0, displayText.length + 1));
            }, 150);
        } 
        else {
            timeout = setTimeout(() => setTyping(false), 1000);
        }
    } 
    else {
        if (displayText.length > 0) {
            timeout = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
            }, 100);
        } 
        else {
            setTyping(true);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }
    }

    return () => clearTimeout(timeout);
  }, [displayText, typing, currentWord]);

  return (
    <div className="text-center space-y-3 mt-20">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent leading-tight">
        AI-powered verification
        <br />
        for informed choices
      </h1>

      <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
        Type your prompt, add <span className="text-white">{displayText}</span>
        <span className="animate-blink text-white">|</span> and obtain verified insights
      </p>
    </div>
  );
};

export default LandingPage;

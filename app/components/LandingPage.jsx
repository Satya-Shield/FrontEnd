import React from 'react'

const LandingPage = () => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
        AI-powered verification
        <br />
        for informed choices
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
        Type your prompt, let AI validate and obtain verified insights
      </p>
      
    </div>
  )
}

export default LandingPage
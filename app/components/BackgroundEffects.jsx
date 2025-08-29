"use client";

// complete by chatgpt ... will modify a bit further ... just for the general idea rn
import React, { useEffect, useState } from "react";

const BackgroundEffects = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);

   
    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

  // Initialize particles
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 80; i++) {
      temp.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.2 + 0.05,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
      });
    }
    setParticles(temp);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => {
          // slight cursor attraction
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const attraction = distance < 150 ? 0.03 : 0;
          return {
            ...p,
            x: (p.x + p.speedX + attraction * dx + window.innerWidth) % window.innerWidth,
            y: (p.y + p.speedY + attraction * dy + window.innerHeight) % window.innerHeight,
          };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, [mousePos]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Solid black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Cursor-following glow orb */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-tr from-purple-600/30 via-purple-400/20 to-white/10 opacity-50 rounded-full blur-3xl transition-all duration-300"
        style={{
          top: `${mousePos.y - 192}px`,
          left: `${mousePos.x - 192}px`,
        }}
      />

      {/* Floating orbs with parallax */}
      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ top: "10%", left: "20%" }} />
      <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ top: "70%", left: "75%", animationDelay: "1s" }} />
      <div className="absolute w-48 h-48 bg-purple-300/25 rounded-full blur-3xl animate-float" style={{ top: "50%", left: "60%", animationDelay: "2s" }} />
      <div className="absolute w-60 h-60 bg-purple-400/15 rounded-full blur-3xl animate-float" style={{ top: "30%", left: "50%", animationDelay: "0.5s" }} />

      {/* Soft animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-purple-700/15 to-black opacity-40 animate-gradient-shift" />

      {/* Subtle grid / circuit effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.y,
            left: p.x,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundEffects;

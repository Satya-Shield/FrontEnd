import React, { useState, useEffect } from "react";
import { 
    FaCheckCircle, 
    FaTimesCircle, 
    FaExclamationTriangle, 
    FaBrain, 
    FaBolt, 
    FaShieldAlt, 
    FaExternalLinkAlt,
    FaCogs
} from 'react-icons/fa';

const BackendResponse = ({ jsonResponse }) => {
    const response = jsonResponse[0];
    // Later : Add animation to the confidence bar
    const [confidenceBar, setConfidenceBar] = useState(0);
    const [checkedItems, setCheckedItems] = useState({});

    const getColorScheme = () => {
        if(response.verdict==="true" && response.confidence>=80) {
            return {
                gradient: 'from-emerald-500/20 to-green-500/10',
                border: 'border-emerald-500/30',
                icon: FaCheckCircle,
                accentBg: 'bg-emerald-500/10',
                accentBorder: 'border-emerald-500/20',
                textAccent: 'text-emerald-400',
                progressBg: 'bg-emerald-500',
            };
        } 
        else if (response.verdict === "Refuted" && response.confidence <= 60) {
            return {
                gradient: 'from-red-500/20 to-rose-500/10',
                border: 'border-red-500/30',
                icon: FaTimesCircle,
                accentBg: 'bg-red-500/10',
                accentBorder: 'border-red-500/20',
                textAccent: 'text-red-400',
                progressBg: 'bg-red-500',
            };
        } 
        else {
            return {
                gradient: 'from-amber-500/20 to-yellow-500/10',
                border: 'border-amber-500/30',
                icon: FaExclamationTriangle,
                accentBg: 'bg-amber-500/10',
                accentBorder: 'border-amber-500/20',
                textAccent: 'text-amber-400',
                progressBg: 'bg-amber-500',
            };
        }
    };

    const colorScheme = getColorScheme();
    const IconComponent = colorScheme.icon;

    // Hard coding right now to see how it looks
    const techniques = ["Sources", "Google", "Reddit", "Twitter"];


    const checklist = response.checklist;

    const handleCheckboxChange = (index) => {
        setCheckedItems(prev => ({ ...prev, [index]: !prev[index]}));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setConfidenceBar(response.confidence);
            }, 500);
            return () => clearTimeout(timer);
        }, [response.confidence]);

  return (
    <div className={`${colorScheme.border} relative space-y-1 p-4 rounded-2xl border-gray-700 bg-gray-900/60 backdrop-blur-lg shadow-lg w-[600px]`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.gradient} opacity-50 rounded-2xl`} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-2xl" />
      
        <div className="relative space-y-4">
            <div className="flex items-center gap-2">
                <FaBolt className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm uppercase tracking-wider text-blue-400">Claim To Check</h3>
            </div>

            {/* Claim */}
            <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-6 backdrop-blur-sm`}>
                <p className="text-white leading-relaxed text-lg">
                    "{response.claim}"
                </p>
            </div>

        {/* Verdict + Confidence Level */}
            <div className="grid grid-cols-2 gap-6">
            
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <FaShieldAlt className="w-4 h-4 text-gray-400" />
                        <h4 className="text-sm uppercase tracking-wider text-gray-400">Verdict</h4>
                    </div>
                    <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-4 backdrop-blur-sm`}>
                        <div className="flex items-center gap-3">
                            <IconComponent className={`w-6 h-6 ${colorScheme.textAccent}`} />
                            <span className={`text-xl font-medium ${colorScheme.textAccent}`}>{response.verdict}</span>
                        </div>
                    </div>
                </div>
            
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                            <FaBolt className="w-4 h-4 text-gray-400" />
                            <h4 className="text-sm uppercase tracking-wider text-gray-400">Confidence Level</h4>
                    </div>
                    <div className={`${colorScheme.accentBg} ${colorScheme.accentBorder} border rounded-xl p-4 backdrop-blur-sm`}>
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-2xl font-bold ${colorScheme.textAccent}`}>{confidenceBar}%</span>
                            <span className="text-sm text-gray-400">Certainty</span>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className={`${colorScheme.progressBg} h-2 rounded-full transition-all duration-700`} style={{ width: `${confidenceBar}%` }} />
                        </div>
                    </div>
                </div>
            </div>

        {/* Techniques */}
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-indigo-400" />
                <h4 className="text-sm uppercase tracking-wider text-indigo-400">Analysis Techniques</h4>
            </div>
            <div className="flex flex-wrap gap-2">
                {techniques.map((technique, index) => (
                <span
                    key={index}
                    className="px-4 py-2 bg-gray-800/80 border border-gray-600/50 text-gray-300 text-sm rounded-lg backdrop-blur-sm hover:bg-gray-700/80 transition-colors duration-200"
                >
                    {technique}
                </span>
            ))}
            </div>
        </div>

        {/* Analysis */}
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <FaBrain className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm uppercase tracking-wider text-purple-400">AI Analysis</h4>
            </div>
            <div className="bg-gray-800/60 border border-gray-600/50 rounded-xl p-6 backdrop-blur-sm">
                <p className="text-gray-300 leading-relaxed text-base">
                    {response.explanation}
                </p>
            </div>
        </div>

        {/* Sources */}
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <FaExternalLinkAlt className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm uppercase tracking-wider text-cyan-400">Sources</h4>
            </div>

            <div className="bg-gray-800/60 border border-gray-600/50 rounded-xl p-6 backdrop-blur-sm space-y-3">
                {response.sources.map((source, index) => (
                <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <span className="text-xs text-cyan-400">{index + 1}</span>
                    </div>
                <a 
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-gray-300 hover:text-cyan-300 transition-colors duration-200 group-hover:underline decoration-cyan-400/50"
                >
                  {source}
                  <FaExternalLinkAlt className="inline w-3 h-3 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <FaCheckCircle className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm uppercase tracking-wider text-emerald-400">Verification Checklist</h4>
            </div>
            <div className="bg-gray-800/60 border border-gray-600/50 rounded-xl p-4 backdrop-blur-sm space-y-3">
                {checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                            <input
                                type="checkbox"
                                id={`checklist-${index}`}
                                checked={checkedItems[index] || false}
                                onChange={() => handleCheckboxChange(index)}
                                className="w-4 h-4 rounded border-gray-500 bg-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-2"
                            />
                        </div>
                        <label
                        htmlFor={`checklist-${index}`}
                        className={`text-sm leading-relaxed cursor-pointer transition-colors duration-200 ${
                            checkedItems[index] ? 'text-emerald-300 line-through' : 'text-gray-300'
                        }`}
                        >
                        {item}
                        </label>
                    </div>
                ))}
            </div>
        </div>
      </div>

    </div>
  );
};

export default BackendResponse;
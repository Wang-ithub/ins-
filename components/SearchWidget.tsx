import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';
import { SEARCH_ENGINES } from '../constants';

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const SearchWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [engineIndex, setEngineIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `${SEARCH_ENGINES[engineIndex].url}${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="relative z-20 w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSearch} className="relative">
        <MotionDiv
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
          className={`flex items-center rounded-full transition-colors duration-300 overflow-visible ${
            isFocused ? 'bg-white/90' : 'bg-white/40 hover:bg-white/60'
          } backdrop-blur-md border border-white/50`}
        >
          {/* Engine Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 pl-6 pr-4 py-4 text-gray-700 font-medium border-r border-gray-200/50 hover:text-gray-900 transition-colors"
            >
              <span>{SEARCH_ENGINES[engineIndex].name}</span>
              <ChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showDropdown && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-4 mt-2 w-32 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden py-2"
                >
                  {SEARCH_ENGINES.map((engine, idx) => (
                    <button
                      key={engine.name}
                      type="button"
                      onClick={() => {
                        setEngineIndex(idx);
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                        engineIndex === idx ? 'text-purple-600 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      {engine.name}
                    </button>
                  ))}
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={SEARCH_ENGINES[engineIndex].placeholder}
            className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-gray-800 placeholder-gray-500 font-medium"
          />

          <MotionButton
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="mr-2 p-3 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full text-white shadow-lg shadow-purple-500/30"
          >
            <Search size={20} />
          </MotionButton>
        </MotionDiv>
      </form>
    </div>
  );
};

export default SearchWidget;
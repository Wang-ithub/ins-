import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchWidget from './components/SearchWidget';
import QuickLinks from './components/QuickLinks';
import WeatherWidget from './components/WeatherWidget';
import QuoteWidget from './components/QuoteWidget';
import TodoWidget from './components/TodoWidget';
import SettingsWidget from './components/SettingsWidget';
import { LinkItem, Theme } from './types';
import { DEFAULT_LINKS, BACKGROUNDS } from './constants';

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem('ins-links');
    return saved ? JSON.parse(saved) : DEFAULT_LINKS;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('ins-theme') as Theme) || Theme.Light;
  });

  const [bgIndex, setBgIndex] = useState(() => {
    const saved = localStorage.getItem('ins-bg-index');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ins-links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('ins-theme', theme);
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ins-bg-index', bgIndex.toString());
  }, [bgIndex]);

  const handleAddLink = (link: LinkItem) => {
    setLinks([...links, link]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-sans text-gray-800">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <MotionDiv
           key={bgIndex}
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="w-full h-full"
        >
          <img 
            src={BACKGROUNDS[bgIndex].url} 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
          {/* Overlay for readability */}
          <div className={`absolute inset-0 transition-colors duration-500 ${
            theme === Theme.Dark ? 'bg-black/40' : 'bg-black/10'
          }`} />
        </MotionDiv>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl px-6 py-8 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Bar: Weather & Settings */}
        <header className="flex justify-between items-start w-full mb-12">
          <div className="mt-4">
             <WeatherWidget />
          </div>
          <SettingsWidget 
            theme={theme} 
            onToggleTheme={() => setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)}
            currentBgIndex={bgIndex}
            onSelectBg={setBgIndex}
          />
        </header>

        {/* Center Content: Search & Links */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-20">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
             <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-center text-white drop-shadow-md mb-2 tracking-tight">
                  Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
                </h1>
                <QuoteWidget />
             </div>
             
             <SearchWidget />
             <QuickLinks links={links} onAddLink={handleAddLink} onRemoveLink={handleRemoveLink} />
          </MotionDiv>
        </div>

        {/* Footer/Overlay Widgets */}
        <TodoWidget />
        
        <footer className="w-full py-4 text-center text-white/50 text-xs">
           INS Tab &copy; {new Date().getFullYear()}
        </footer>
      </main>

    </div>
  );
};

export default App;
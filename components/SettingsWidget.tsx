import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Sun, Image as ImageIcon } from 'lucide-react';
import { Theme } from '../types';
import { BACKGROUNDS } from '../constants';

interface SettingsWidgetProps {
  theme: Theme;
  onToggleTheme: () => void;
  currentBgIndex: number;
  onSelectBg: (index: number) => void;
}

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const SettingsWidget: React.FC<SettingsWidgetProps> = ({ theme, onToggleTheme, currentBgIndex, onSelectBg }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-40">
      <MotionButton
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/30 transition-colors"
      >
        <Settings size={20} />
      </MotionButton>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, x: 20 }}
            className="absolute top-14 right-0 w-72 bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-2xl border border-white/50 origin-top-right"
          >
            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Appearance</span>
                <button
                  onClick={onToggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {theme === Theme.Light ? <Sun size={16} className="text-orange-500" /> : <Moon size={16} className="text-indigo-500" />}
                  <span className="text-sm text-gray-600">{theme === Theme.Light ? 'Light' : 'Dark'}</span>
                </button>
              </div>

              {/* Background Picker */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                  <ImageIcon size={16} />
                  <span>Wallpaper</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {BACKGROUNDS.map((bg, idx) => (
                    <button
                      key={bg.name}
                      onClick={() => onSelectBg(idx)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        currentBgIndex === idx ? 'border-purple-500 scale-95 ring-2 ring-purple-200' : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                      {currentBgIndex === idx && (
                         <div className="absolute inset-0 bg-purple-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsWidget;
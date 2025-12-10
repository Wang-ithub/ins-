import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { LinkItem } from '../types';
import { Icon } from './Icon';

interface QuickLinksProps {
  links: LinkItem[];
  onAddLink: (link: LinkItem) => void;
  onRemoveLink: (id: string) => void;
}

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const QuickLinks: React.FC<QuickLinksProps> = ({ links, onAddLink, onRemoveLink }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: 'Globe' });

  const handleAdd = () => {
    if (newLink.title && newLink.url) {
      onAddLink({
        id: Date.now().toString(),
        title: newLink.title,
        url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`,
        icon: 'Globe',
        color: 'from-indigo-400 to-cyan-400'
      });
      setNewLink({ title: '', url: '', icon: 'Globe' });
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
        <AnimatePresence>
          {links.map((link) => (
            <MotionDiv
              key={link.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col items-center gap-3 w-24"
            >
              <button 
                onClick={() => onRemoveLink(link.id)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm"
              >
                <X size={10} />
              </button>
              
              <a href={link.url} className="flex flex-col items-center gap-3 w-full">
                <div className={`
                  w-16 h-16 rounded-3xl flex items-center justify-center 
                  bg-gradient-to-br ${link.color} 
                  shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-purple-500/20 
                  transition-all duration-300 border border-white/20
                `}>
                  <Icon name={link.icon} className="text-white drop-shadow-md" size={32} />
                </div>
                <span className="text-sm font-medium text-white/90 bg-black/10 px-2 py-0.5 rounded-md backdrop-blur-sm truncate w-full text-center group-hover:bg-black/30 transition-colors">
                  {link.title}
                </span>
              </a>
            </MotionDiv>
          ))}
          
          <MotionButton
            layout
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAdding(true)}
            className="flex flex-col items-center gap-3 w-24"
          >
             <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all shadow-lg">
                <Plus className="text-white/80" size={32} />
             </div>
             <span className="text-sm font-medium text-white/80">Add</span>
          </MotionButton>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAdding && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <MotionDiv
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 w-96 shadow-2xl relative"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-800">Add Shortcut</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Website Name"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <input
                  type="text"
                  placeholder="URL (e.g. google.com)"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                />
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                  >
                    Add Link
                  </button>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickLinks;
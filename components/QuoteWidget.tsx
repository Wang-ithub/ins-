import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { QUOTES } from '../constants';

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

const QuoteWidget: React.FC = () => {
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    // Select quote based on day of year to be "Daily"
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setQuote(QUOTES[dayOfYear % QUOTES.length]);
  }, []);

  // Split text for animation
  const words = quote.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="mt-12 text-center max-w-xl mx-auto px-4">
      <MotionDiv
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-xl md:text-2xl font-medium leading-relaxed"
      >
        {words.map((word, index) => (
          <MotionSpan
            variants={child}
            key={index}
            className="inline-block mr-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent drop-shadow-md"
          >
            {word}
          </MotionSpan>
        ))}
      </MotionDiv>
    </div>
  );
};

export default QuoteWidget;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, MapPin } from 'lucide-react';
import { WeatherData } from '../types';

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 22,
    condition: 'Sunny',
    city: 'San Francisco'
  });

  // Mock weather update
  useEffect(() => {
    // In a real app, use OpenWeatherMap or similar.
    // Simulating API fetch
    const conditions: Array<WeatherData['condition']> = ['Sunny', 'Cloudy', 'Rainy', 'Clear'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    
    setWeather(prev => ({ ...prev, condition: randomCondition, temp: randomTemp }));
  }, []);

  const getIcon = () => {
    switch (weather.condition) {
      case 'Sunny': return <Sun className="text-yellow-400 drop-shadow-lg" size={48} />;
      case 'Clear': return <Sun className="text-orange-400 drop-shadow-lg" size={48} />;
      case 'Rainy': return <CloudRain className="text-blue-400 drop-shadow-lg" size={48} />;
      case 'Snowy': return <CloudSnow className="text-white drop-shadow-lg" size={48} />;
      default: return <Cloud className="text-gray-200 drop-shadow-lg" size={48} />;
    }
  };

  const getGradient = () => {
    switch (weather.condition) {
      case 'Sunny': return 'from-blue-400/80 to-blue-300/60';
      case 'Clear': return 'from-orange-400/80 to-yellow-300/60';
      case 'Rainy': return 'from-slate-700/80 to-slate-500/60';
      default: return 'from-gray-400/80 to-gray-200/60';
    }
  };

  return (
    <MotionDiv
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative overflow-hidden rounded-3xl p-6 text-white backdrop-blur-xl bg-gradient-to-br ${getGradient()} border border-white/20 shadow-lg w-full max-w-[280px]`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-5xl font-bold tracking-tighter">{weather.temp}°</span>
          <span className="text-lg font-medium opacity-90">{weather.condition}</span>
        </div>
        <MotionDiv 
            animate={{ rotate: weather.condition === 'Sunny' ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
            {getIcon()}
        </MotionDiv>
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-80">
        <MapPin size={14} />
        <span>{weather.city}</span>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
    </MotionDiv>
  );
};

export default WeatherWidget;
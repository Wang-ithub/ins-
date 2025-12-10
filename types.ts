export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string; // Lucide icon name or image URL
  color: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface SearchEngine {
  name: string;
  url: string;
  placeholder: string;
}

export interface WeatherData {
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Snowy' | 'Clear';
  city: string;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
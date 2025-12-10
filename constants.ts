import { LinkItem, SearchEngine } from './types';

export const DEFAULT_LINKS: LinkItem[] = [
  { id: '1', title: 'Google', url: 'https://google.com', icon: 'Search', color: 'from-blue-400 to-blue-600' },
  { id: '2', title: 'YouTube', url: 'https://youtube.com', icon: 'Youtube', color: 'from-red-400 to-red-600' },
  { id: '3', title: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', color: 'from-pink-500 to-purple-600' },
  { id: '4', title: 'GitHub', url: 'https://github.com', icon: 'Github', color: 'from-gray-600 to-gray-800' },
  { id: '5', title: 'Gmail', url: 'https://mail.google.com', icon: 'Mail', color: 'from-green-400 to-emerald-600' },
  { id: '6', title: 'Twitter', url: 'https://twitter.com', icon: 'Twitter', color: 'from-sky-400 to-blue-500' },
];

export const SEARCH_ENGINES: SearchEngine[] = [
  { name: 'Google', url: 'https://www.google.com/search?q=', placeholder: 'Search Google...' },
  { name: 'Bing', url: 'https://www.bing.com/search?q=', placeholder: 'Search Bing...' },
  { name: 'Baidu', url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下...' },
];

export const QUOTES = [
  "Stay hungry, stay foolish.",
  "Make each day your masterpiece.",
  "Dream big and dare to fail.",
  "Simplicity is the ultimate sophistication.",
  "Be the change that you wish to see in the world.",
  "Turn your wounds into wisdom.",
  "Do what you love, love what you do."
];

export const BACKGROUNDS = [
  { type: 'image', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', name: 'Mountain Lake' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', name: 'Pastel Gradient' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', name: 'Urban Sunset' },
  { type: 'image', url: 'https://images.unsplash.com/photo-1534067783741-512969af41e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', name: 'Minimalist Plant' },
];
import React from 'react';
import { 
  Search, Youtube, Instagram, Github, Mail, Twitter, 
  Facebook, Linkedin, Globe, Code, Cloud, Sun, CloudRain, 
  CloudSnow, Moon, CheckCircle, Plus, Trash2, Settings, 
  Image as ImageIcon, MoreHorizontal 
} from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const icons: Record<string, React.ElementType> = {
    Search, Youtube, Instagram, Github, Mail, Twitter, 
    Facebook, Linkedin, Globe, Code, Cloud, Sun, CloudRain, 
    CloudSnow, Moon, CheckCircle, Plus, Trash2, Settings, 
    ImageIcon, MoreHorizontal
  };

  const LucideIcon = icons[name] || Globe;
  return <LucideIcon className={className} size={size} />;
};
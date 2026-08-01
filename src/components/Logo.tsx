import React from 'react';
import oceanViewLogo from '../assets/images/oceanview_resort_logo_1785518556173.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const OCEANVIEW_LOGO_SRC = oceanViewLogo;

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'dark',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
    xl: 'h-20 w-auto',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={oceanViewLogo}
        alt="OceanView Country Club & Resort Logo"
        className={`${sizeClasses[size]} object-contain rounded-lg shadow-sm`}
        referrerPolicy="no-referrer"
      />
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : size === 'xl' ? 'text-2xl' : 'text-base'
            } ${variant === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            OceanView
          </span>
          <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider leading-tight">
            Country Club & Resort
          </span>
        </div>
      )}
    </div>
  );
};

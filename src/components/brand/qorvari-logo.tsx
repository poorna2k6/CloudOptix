import React from 'react';

interface QorvariLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark';
}

/**
 * Qorvari Brand Logo Component
 * 
 * Design Philosophy:
 * - Modern, geometric design representing cloud infrastructure
 * - Hexagonal pattern symbolizing distributed systems and scalability
 * - Gradient colors representing transformation and innovation
 * - Clean, professional aesthetic for enterprise clients
 */
export function QorvariLogo({ 
  className = '', 
  size = 'md',
  variant = 'full',
  theme = 'dark'
}: QorvariLogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-base' },
    md: { icon: 32, text: 'text-lg' },
    lg: { icon: 40, text: 'text-2xl' },
    xl: { icon: 48, text: 'text-3xl' },
  };

  const iconSize = sizes[size].icon;
  const textSize = sizes[size].text;

  const Icon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer hexagon - representing cloud infrastructure */}
      <path
        d="M24 2L42 13V35L24 46L6 35V13L24 2Z"
        className="fill-gradient-to-br from-cyan-500 to-blue-600"
        stroke="url(#gradient1)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Inner geometric pattern - representing data flow and transformation */}
      <path
        d="M24 10L35 16.5V31.5L24 38L13 31.5V16.5L24 10Z"
        className="fill-gradient-to-br from-blue-500 to-violet-600"
        opacity="0.8"
      />
      
      {/* Center node - representing optimization and control */}
      <circle
        cx="24"
        cy="24"
        r="6"
        className="fill-white"
        opacity="0.9"
      />
      
      {/* Connection lines - representing integration */}
      <line x1="24" y1="10" x2="24" y2="18" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="24" y1="30" x2="24" y2="38" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="13" y1="16.5" x2="18" y2="20" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="28" x2="35" y2="31.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="6" y1="2" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="gradient2" x1="13" y1="10" x2="35" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );

  const Text = () => (
    <span className={`font-bold tracking-tight ${textSize}`}>
      <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>
        Qor
      </span>
      <span className="gradient-text">
        vari
      </span>
    </span>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <Icon />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        <Text />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Icon />
      <Text />
    </div>
  );
}

/**
 * Simplified logo for favicons and small spaces
 */
export function QorvariIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        fill="url(#iconGradient)"
      />
      <circle cx="16" cy="16" r="4" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id="iconGradient" x1="4" y1="2" x2="28" y2="30">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Made with Bob

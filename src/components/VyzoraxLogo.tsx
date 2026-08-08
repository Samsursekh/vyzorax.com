import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isDarkTheme?: boolean;
  showTagline?: boolean; // Maintained for prop compatibility
}

export const VyzoraxLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  isDarkTheme = true,
}) => {
  // Height scaling
  const height = size === 'sm' ? 34 : size === 'lg' ? 48 : 40;
  const textPrimaryColor = isDarkTheme ? '#FFFFFF' : '#0F172A';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Vyzorax Standalone Vector Logo (Icon + VYZORAX Typography matching user logo) */}
      <svg
        height={height}
        viewBox="0 0 335 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto shrink-0 drop-shadow-sm"
      >
        <defs>
          {/* Left Arm Gradient: Cyan -> Blue -> Indigo/Purple */}
          <linearGradient id="vyz-lgrad" x1="15" y1="10" x2="65" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          {/* Right Arm Gradient: Purple -> Deep Violet */}
          <linearGradient id="vyz-rgrad" x1="45" y1="35" x2="85" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>

          {/* Top Bar & Speed Particles Gradient */}
          <linearGradient id="vyz-pgrad" x1="55" y1="12" x2="115" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00c6ff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* LOGO MARK (Left "V" Emblem) */}
        <g id="vyzorax-icon-mark">
          {/* Left Pill Arm (Angled down) */}
          <rect
            x="18"
            y="10"
            width="22"
            height="62"
            rx="11"
            transform="rotate(-26 29 41)"
            fill="url(#vyz-lgrad)"
          />

          {/* Right Lower Pill Arm (Angled up) */}
          <rect
            x="48"
            y="32"
            width="20"
            height="46"
            rx="10"
            transform="rotate(26 58 55)"
            fill="url(#vyz-rgrad)"
          />

          {/* Top Horizontal Rounded Bar */}
          <rect
            x="46"
            y="12"
            width="30"
            height="15"
            rx="7.5"
            fill="url(#vyz-pgrad)"
          />

          {/* Speed Motion Particles & Dashes (Top Right of V Mark) */}
          <rect x="80" y="13" width="13" height="3.5" rx="1.75" fill="url(#vyz-pgrad)" />
          <circle cx="97" cy="14.75" r="1.75" fill="#38bdf8" />
          <circle cx="102" cy="14.75" r="1.25" fill="#38bdf8" />

          <rect x="78" y="18" width="19" height="3.5" rx="1.75" fill="url(#vyz-pgrad)" />
          <rect x="100" y="18" width="5" height="3.5" rx="1.75" fill="#38bdf8" />
          <circle cx="109" cy="19.75" r="1.25" fill="#38bdf8" />

          <rect x="82" y="23" width="14" height="3.5" rx="1.75" fill="url(#vyz-pgrad)" />
          <rect x="99" y="23" width="8" height="3.5" rx="1.75" fill="#38bdf8" />

          <rect x="77" y="28" width="17" height="3.5" rx="1.75" fill="url(#vyz-pgrad)" />
          <circle cx="98" cy="29.75" r="1.75" fill="#38bdf8" />

          <rect x="84" y="33" width="9" height="3.5" rx="1.75" fill="url(#vyz-pgrad)" />
          <circle cx="96" cy="34.75" r="1.25" fill="#38bdf8" />
        </g>

        {/* LOGO TYPOGRAPHY: "VYZORAX" */}
        <g id="vyzorax-text">
          {/* Text VYZOR */}
          <text
            x="120"
            y="52"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="38"
            letterSpacing="4"
            fill={textPrimaryColor}
          >
            VYZOR
          </text>

          {/* Custom "A" with Cyan Dot on crossbar */}
          <g transform="translate(250, 20)">
            <path d="M 3 32 L 14 0 L 22 0 L 33 32 L 24 32 L 21 23 L 15 23 L 12 32 Z" fill={textPrimaryColor} />
            <circle cx="18" cy="20" r="3" fill="#00c6ff" />
          </g>

          {/* Letter "X" */}
          <text
            x="286"
            y="52"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="38"
            letterSpacing="4"
            fill={textPrimaryColor}
          >
            X
          </text>
        </g>
      </svg>
    </div>
  );
};

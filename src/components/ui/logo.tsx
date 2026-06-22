export function BarberGoLogo({ className = "w-12 h-12", animate = true }: { className?: string; animate?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${animate ? "animate-pulse" : ""} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Turquoise gradient background matching healthcare aesthetic */}
          <linearGradient id="clinicTeal" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>

          {/* Premium gold metallic texture */}
          <linearGradient id="goldMetallic" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          {/* Gold gradient for outer ring */}
          <linearGradient id="goldRing" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="50%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Clipping path to keep background rounded */}
          <clipPath id="circleClip">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Circular Flag/Clinic Base */}
        <g clipPath="url(#circleClip)">
          <rect x="0" y="0" width="100" height="100" fill="url(#clinicTeal)" />
          {/* Subtle clean visual design circles */}
          <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </g>

        {/* Golden Metallic Ring Border */}
        <circle cx="50" cy="50" r="46.5" fill="none" stroke="url(#goldRing)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#000000" strokeWidth="0.5" opacity="0.2" />

        {/* Intertwined Tooth (Dentistry) and Face Contour (Aesthetics) */}
        <g filter="url(#shadowFilter)" transform="translate(50, 48)">
          
          {/* Stylized gold tooth profile (left side) */}
          <path 
            d="M -2.5 -14 C -8.5 -14 -11.5 -8 -11.5 -2.5 C -11.5 4 -8.5 8.5 -8.5 13 C -8.5 14.5 -6.5 14.5 -5.8 13 C -5 11 -3.7 10 -2.9 10 C -2.2 10 -0.8 11 -0.1 13 C 0.6 14.5 2.6 14.5 2.6 13 C 2.6 8.5 5.6 4 5.6 -2.5 C 5.6 -8 2.6 -14 -2.5 -14 Z" 
            stroke="url(#goldMetallic)" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
            transform="translate(-6, 0)"
          />

          {/* Stylized gold face profile line (right side) */}
          <path 
            d="M -3 -16.5 C 1 -16.5 6.5 -13.5 8 -9 C 8.8 -6.7 7.3 -5.2 6.5 -3.7 C 5.7 -2.2 7.2 -1.5 8.8 -1.5 C 11 -1.5 11 -4.5 12.5 -4.5 C 13.2 -4.5 13.6 -3.7 13.2 -2.2 C 12.5 0.8 9.5 4.5 8 6 C 6.5 7.5 7.3 9 5.8 10.5 C 4.3 12 1.3 13.5 -2.5 13.5" 
            stroke="url(#goldMetallic)" 
            strokeWidth="1.8" 
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            transform="translate(5, 0)"
          />
          
          {/* Tiny gold sparkles representing clinical cleanliness & beauty success */}
          <path d="M 8 -11 L 8.8 -9 L 10.8 -8.2 L 8.8 -7.4 L 8 -5.4 L 7.2 -7.4 L 5.2 -8.2 L 7.2 -9 Z" fill="url(#goldMetallic)" />
          <path d="M -12 7 L -11.5 8 L -10.5 8.3 L -11.5 8.6 L -12 9.6 L -12.5 8.6 L -13.5 8.3 L -12.5 8 Z" fill="url(#goldMetallic)" transform="scale(0.8) translate(-3, 3)" />
        </g>

        {/* Gold logo label text */}
        <g filter="url(#shadowFilter)">
          <text
            x="50"
            y="85"
            textAnchor="middle"
            fill="url(#goldMetallic)"
            fontSize="10"
            fontWeight="900"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            DC GO
          </text>
        </g>
      </svg>
    </div>
  );
}

// Export DoctorCorpoLogo as an alias for better naming context
export const DoctorCorpoLogo = BarberGoLogo;

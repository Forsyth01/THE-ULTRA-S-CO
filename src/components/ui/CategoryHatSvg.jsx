"use client";

export default function CategoryHatSvg({ type }) {
  if (type === "snapbacks") {
    return (
      <svg
        viewBox="0 0 280 280"
        className="w-[220px] h-[220px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(140,145)">
          <ellipse cx="0" cy="55" rx="115" ry="16" fill="#0f0f0f" />
          <path
            d="M-105,55 Q-88,-35 0,-52 Q88,-35 105,55 Z"
            fill="#c8f050"
          />
          <line
            x1="0"
            y1="-52"
            x2="0"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            opacity=".35"
          />
          <line
            x1="0"
            y1="-52"
            x2="-70"
            y2="35"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            opacity=".35"
          />
          <line
            x1="0"
            y1="-52"
            x2="70"
            y2="35"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            opacity=".35"
          />
          <circle cx="0" cy="0" r="22" fill="#0a0a0a" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="9"
            fill="#c8f050"
          >
            UC
          </text>
          <circle cx="0" cy="-52" r="5" fill="#0a0a0a" />
          <rect x="-12" y="55" width="24" height="5" rx="2" fill="#1a1a1a" />
        </g>
      </svg>
    );
  }

  if (type === "beanies") {
    return (
      <svg
        viewBox="0 0 280 280"
        className="w-[220px] h-[220px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(140,145)">
          {/* Beanie shape */}
          <ellipse cx="0" cy="55" rx="90" ry="14" fill="#111" />
          <rect x="-90" y="20" width="180" height="38" rx="0" fill="#1a1a1a" />
          <path d="M-90,20 Q-85,-70 0,-80 Q85,-70 90,20 Z" fill="#c8f050" />
          {/* Ribbing lines */}
          <line
            x1="-60"
            y1="20"
            x2="-60"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity=".5"
          />
          <line
            x1="-30"
            y1="20"
            x2="-30"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity=".5"
          />
          <line
            x1="0"
            y1="20"
            x2="0"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity=".5"
          />
          <line
            x1="30"
            y1="20"
            x2="30"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity=".5"
          />
          <line
            x1="60"
            y1="20"
            x2="60"
            y2="55"
            stroke="#0a0a0a"
            strokeWidth="2"
            opacity=".5"
          />
          {/* Pom pom */}
          <circle cx="0" cy="-80" r="14" fill="#0a0a0a" />
          <circle cx="-6" cy="-83" r="6" fill="#1a1a1a" />
          <circle cx="6" cy="-78" r="5" fill="#222" />
          {/* Logo */}
          <text
            x="0"
            y="-15"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="18"
            fill="#0a0a0a"
            opacity=".4"
          >
            UC
          </text>
        </g>
      </svg>
    );
  }

  if (type === "bucket-hats") {
    return (
      <svg
        viewBox="0 0 280 280"
        className="w-[220px] h-[220px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(140,145)">
          {/* Bucket hat brim */}
          <ellipse cx="0" cy="50" rx="120" ry="20" fill="#0f0f0f" />
          <ellipse cx="0" cy="45" rx="100" ry="14" fill="#1a1a1a" />
          {/* Bucket body */}
          <path d="M-95,45 L-70,-50 Q0,-65 70,-50 L95,45 Z" fill="#c8f050" />
          {/* Horizontal band */}
          <path
            d="M-95,45 L-70,-50 L70,-50 L95,45"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="16"
            opacity=".25"
          />
          {/* Logo circle */}
          <circle cx="0" cy="0" r="22" fill="#0a0a0a" opacity=".5" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="9"
            fill="#c8f050"
          >
            UC
          </text>
          {/* Top button */}
          <circle cx="0" cy="-55" r="5" fill="#0a0a0a" />
        </g>
      </svg>
    );
  }

  return null;
}

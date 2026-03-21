"use client";

export default function ProductHatSvg({ category, color }) {
  if (category === "Snapback") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-[130px] h-[130px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100,105)">
          <ellipse cx="0" cy="52" rx="90" ry="13" fill="#0f0f0f" />
          <path
            d="M-82,52 Q-70,-28 0,-42 Q70,-28 82,52 Z"
            fill={color}
          />
          <line
            x1="0"
            y1="-42"
            x2="0"
            y2="52"
            stroke="#0a0a0a"
            strokeWidth="1.2"
            opacity=".4"
          />
          <circle cx="0" cy="4" r="18" fill="#0a0a0a" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="8"
            fill={color}
          >
            UC
          </text>
          <circle cx="0" cy="-42" r="4" fill="#0a0a0a" />
        </g>
      </svg>
    );
  }

  if (category === "Beanie") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-[130px] h-[130px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100,115)">
          <ellipse cx="0" cy="42" rx="72" ry="11" fill="#111" />
          <rect x="-72" y="16" width="144" height="29" rx="0" fill="#1a1a2e" />
          <path d="M-72,16 Q-68,-56 0,-64 Q68,-56 72,16 Z" fill={color} />
          <circle cx="0" cy="-80" r="11" fill="#111" />
          <circle cx="-4" cy="-82" r="5" fill="#1a1a1a" />
          <text
            x="0"
            y="-12"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="14"
            fill="rgba(255,255,255,.2)"
          >
            UC
          </text>
        </g>
      </svg>
    );
  }

  if (category === "Bucket Hat") {
    return (
      <svg
        viewBox="0 0 200 200"
        className="w-[130px] h-[130px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100,105)">
          <ellipse cx="0" cy="42" rx="96" ry="16" fill="#0f0f0f" />
          <ellipse cx="0" cy="38" rx="80" ry="11" fill="#1a1a1a" />
          <path d="M-76,38 L-56,-42 Q0,-52 56,-42 L76,38 Z" fill={color} />
          <circle cx="0" cy="-2" r="18" fill="#0a0a0a" opacity=".4" />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontFamily="Anton, sans-serif"
            fontSize="7"
            fill="white"
            opacity=".8"
          >
            UC
          </text>
          <circle cx="0" cy="-44" r="4" fill="#0a0a0a" />
        </g>
      </svg>
    );
  }

  return null;
}

import React from 'react';
import { Link } from 'next-view-transitions';

const Logo = ({ hasLink = true, forceWhite = false, title = "Go to home" }) => {
    return (
        <>
            {hasLink &&
                <Link href="/" title={title}>
                    <LogoSvg forceWhite={forceWhite} />
                </Link>}

            {!hasLink && <LogoSvg forceWhite={forceWhite} />}
        </>
    );
};


const LogoSvg = ({ forceWhite = false }) => {
    // Colors based on mode
    const gradientId = forceWhite ? "logo-gradient-white" : "logo-gradient-standard";
    const startColor = forceWhite ? "#FFFFFF" : "#0F4C75";
    const endColor = forceWhite ? "#93C5FD" : "#3282B8"; // blue-300 vs light blue
    const circleFill = forceWhite ? "#FFFFFF" : "#FFFFFF"; // Always white center? Or adaptive
    const nodeColor1 = forceWhite ? "#FFFFFF" : "#0F4C75";
    const nodeColor2 = forceWhite ? "#93C5FD" : "#3282B8";

    return (
        <svg
            className="w-[120px] h-[40px]"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                </linearGradient>
            </defs>

            {/* Symbol: Stylized Robotic Arm / Curve */}
            {/* Main curve body */}
            <path
                d="M10,35 Q18,30 22,15 T26,5"
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Joint Circle with X */}
            <circle cx="15" cy="28" r="5" fill={forceWhite ? "transparent" : "white"} stroke={`url(#${gradientId})`} strokeWidth="2" />
            <path d="M13,26 L17,30 M17,26 L13,30" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round" />

            {/* Dots/Nodes */}
            <circle cx="22" cy="15" r="2.5" fill={nodeColor1} />
            <circle cx="26" cy="5" r="2" fill={nodeColor2} />
        </svg>
    );
}

export default Logo;
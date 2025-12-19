import React from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

interface LogoProps {
    hasLink?: boolean;
    forceWhite?: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ hasLink = true, forceWhite = false, title = "Go to home", size = 'md' }: LogoProps) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const logoElement = (
        <div className={`relative ${sizeClasses[size]}`}>
            <Image
                src="/logo-icon.png?v=3"
                alt="IROL Logo"
                fill
                className={`object-contain mt-0 !m-0 ${forceWhite ? 'brightness-0 invert' : ''}`}
                priority
            />
        </div>
    );

    if (hasLink) {
        return (
            <Link href="/" title={title}>
                {logoElement}
            </Link>
        );
    }

    return logoElement;
};

export default Logo;
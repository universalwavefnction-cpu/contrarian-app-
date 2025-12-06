import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.1)",
    ...props
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || !spotlightRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
    };

    const handleMouseEnter = () => {
        if (spotlightRef.current) {
            spotlightRef.current.style.opacity = '1';
        }
    };

    const handleMouseLeave = () => {
        if (spotlightRef.current) {
            spotlightRef.current.style.opacity = '0';
        }
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            {...props as any}
        >
            <div
                ref={spotlightRef}
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at 0px 0px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            {children}
        </motion.div>
    );
};

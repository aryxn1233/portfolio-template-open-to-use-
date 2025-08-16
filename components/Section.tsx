
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  animationDelay?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, animationDelay = '0ms' }) => {
  return (
    <section 
      className="mb-16 md:mb-24 animate-fade-in-up" 
      style={{ animationDelay }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-white tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
};

'use client';

import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  sectionIds: string[];
  offset?: number;
}

export function useActiveSection({ sectionIds, offset = 100 }: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that is currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const element = document.getElementById(sectionId);
        
        if (element) {
          const { offsetTop } = element;
          
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll listener with throttling for performance
    let timeoutId: NodeJS.Timeout;
    const throttledHandleScroll = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sectionIds, offset]);

  return activeSection;
}
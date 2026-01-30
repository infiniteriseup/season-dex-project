import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isSmallMobile: boolean;
  width: number;
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    return {
      width,
      isSmallMobile: width < 480,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024 && width < 1920,
      isLargeDesktop: width >= 1920,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setState({
        width,
        isSmallMobile: width < 480,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 && width < 1920,
        isLargeDesktop: width >= 1920,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call once to set initial state
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return state;
};

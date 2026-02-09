import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Skip scroll-to-top for Index page if there's a target anchor
    if (location.pathname === "/" && (location.state?.scrollTo || location.hash)) {
      return;
    }
    
    // Immediate scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;

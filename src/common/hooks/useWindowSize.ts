import { useEffect, useState } from "react";

export interface IWindowSize {
  width: number;
  height: number;
}

// Custom Hook
export const useWindowSize = (): IWindowSize => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // Add event listener resize
    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Only run on mount(first render)

  return windowSize;
};

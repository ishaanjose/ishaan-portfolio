import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #007bff, #00ff88);
  transform-origin: 0%;
  transform: scaleX(${props => props.progress});
  z-index: 1001;
  transition: transform 0.1s ease;
`;

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return <ProgressBar progress={progress} />;
}

export default ScrollProgress; 
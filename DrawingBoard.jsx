// mk-board/DrawingBoard.jsx
import React, { useEffect, useRef } from 'react';
import { initBoard } from './index'; // Assuming initBoard is exported from `index.js`

const DrawingBoard = ({
  width = 800,
  height = 500,
  color = 'black',
  lineWidth = 2,
  showClearButton = true
}) => {
  const containerRef = useRef(null);

  
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.innerHTML = ''; // Clear any previous canvas (important if component re-renders)
      initBoard(container, { width, height, color, lineWidth, showClearButton });
    }

    return () => {
      if (container) container.innerHTML = ''; // Cleanup when the component is unmounted
    };
  }, [width, height, color, lineWidth, showClearButton]); // Re-run effect if props change

  return <div ref={containerRef} />;
};

export default DrawingBoard;

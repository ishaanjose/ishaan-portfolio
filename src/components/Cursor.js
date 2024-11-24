import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CursorDot = styled.div`
  width: 8px;
  height: 8px;
  background: #007bff;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  transform: translate(${props => props.x}px, ${props => props.y}px);
`;

const CursorRing = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid #007bff;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.15s ease;
  transform: translate(${props => props.x - 10}px, ${props => props.y - 10}px) 
    scale(${props => (props.isHovering ? 1.5 : 1)});
`;

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onHover = () => setIsHovering(true);
    const onUnhover = () => setIsHovering(false);

    document.addEventListener('mousemove', onMouseMove);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onUnhover);
      });
    };
  }, []);

  return (
    <>
      <CursorDot x={position.x} y={position.y} />
      <CursorRing x={position.x} y={position.y} isHovering={isHovering} />
    </>
  );
}

export default Cursor; 
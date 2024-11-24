import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--shadow-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1002;
  box-shadow: 0 2px 5px var(--shadow-color);

  &:hover {
    transform: rotate(180deg);
  }
`;

function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <ToggleButton onClick={toggleTheme} isDark={isDark}>
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
}

export default ThemeToggle; 
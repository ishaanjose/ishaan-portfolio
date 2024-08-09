import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaSyncAlt } from "react-icons/fa";

const HomeWrapper = styled.div`
  text-align: center;
`;

const Paragraph = styled.p`
  line-height: 1.6;
`;

const highlightAnimation = keyframes`
  0% { background-color: transparent; }
  50% { background-color: yellow; }
  100% { background-color: transparent; }
`;

const BoldText = styled.span`
  font-weight: bold;
  ${({ animate }) => animate && css`
    animation: ${highlightAnimation} 1s forwards;
  `}
`;

const ColorfulImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-top: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ColorfulImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ gradient }) => gradient};
  border-radius: 10px;
`;

const RemixIcon = styled(FaSyncAlt)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 5px;
`;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomGradient() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}

function Home() {
  const [gradient, setGradient] = useState(getRandomGradient());
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handleImageClick = () => {
    setGradient(getRandomGradient());
  };

  useEffect(() => {
    const keywords = [
      "Computer Science",
      "Queen Mary's University",
      "multilingual skills",
      "Python",
      "JavaScript"
    ];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * keywords.length);
      setHighlightedIndex(randomIndex);
      setTimeout(() => {
        setHighlightedIndex(null);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HomeWrapper>
      <Paragraph>
        Hello! I'm Ishaan Jose, a <BoldText animate={highlightedIndex === 0}>Computer Science</BoldText> student at <BoldText animate={highlightedIndex === 1}>Queen Mary's University</BoldText> of London with a passion for technology and its applications in solving real-world problems. My diverse background and <BoldText animate={highlightedIndex === 2}>multilingual skills</BoldText> (fluent in French, English, Spanish, and intermediate Bengali) allow me to work effectively in multicultural environments. I'm constantly learning and expanding my programming skills, with a focus on <BoldText animate={highlightedIndex === 3}>Python</BoldText> and <BoldText animate={highlightedIndex === 4}>JavaScript</BoldText>.
      </Paragraph>
      <ColorfulImageWrapper onClick={handleImageClick}>
        <ColorfulImage gradient={gradient} />
        <RemixIcon />
      </ColorfulImageWrapper>
    </HomeWrapper>
  );
}

export default Home;
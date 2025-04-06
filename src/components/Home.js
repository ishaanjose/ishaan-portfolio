import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { FaSyncAlt, FaPython, FaJs, FaReact } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import FlagIcon from 'react-flagkit';

const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Arial', sans-serif;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContentSection = styled.div`
  @media (min-width: 768px) {
    width: 50%;
    padding-right: 40px;
  }
`;

const Paragraph = styled.p`
  line-height: 1.8;
  font-size: 18px;
  margin-bottom: 20px;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const highlightAnimation = keyframes`
  0% { background-color: transparent; }
  50% { background-color: rgba(255, 255, 0, 0.3); }
  100% { background-color: transparent; }
`;

const BoldText = styled.span`
  font-weight: bold;
  color: #007bff;
  ${({ animate }) => animate && css`
    animation: ${highlightAnimation} 1s forwards;
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  margin-top: 40px;

  @media (min-width: 768px) {
    width: 45%;
    height: 400px;
    margin-top: 0;
  }
`;

const ColorfulImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ColorfulImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ gradient }) => gradient};
  border-radius: 20px;
  transition: transform 10s ease-in-out;

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

const RemixIcon = styled(FaSyncAlt)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 10px;
  font-size: 24px;
  transition: transform 0.3s;

  &:hover {
    transform: rotate(180deg);
  }
`;

const SkillsSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SkillIcon = styled.div`
  font-size: 24px;
  margin: 0 15px;
  color: #007bff;
`;

const FlagsSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const FlagIconWrapper = styled.div`
  font-size: 24px;
  margin: 0 15px;
`;

function getRandomGradient() {
  const color1 = `hsl(${Math.random() * 360}, 100%, 75%)`;
  const color2 = `hsl(${Math.random() * 360}, 100%, 75%)`;
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
      <ContentSection>
        <Paragraph>
          Hello! I'm Ishaan Jose, a <BoldText animate={highlightedIndex === 0}>Computer Science</BoldText> student at <BoldText animate={highlightedIndex === 1}>Queen Mary's University</BoldText> of London with a passion for technology and its applications in solving real-world problems.
        </Paragraph>
        <Paragraph>
          My diverse background and <BoldText animate={highlightedIndex === 2}>multilingual skills</BoldText> (fluent in French, English, Spanish, and intermediate Bengali) allow me to work effectively in multicultural environments.
        </Paragraph>
        <Paragraph>
          I'm constantly learning and expanding my programming skills, with a focus on <BoldText animate={highlightedIndex === 3}>Python</BoldText> and <BoldText animate={highlightedIndex === 4}>JavaScript</BoldText>.
        </Paragraph>
        <SkillsSection>
          <SkillIcon><FaPython /></SkillIcon>
          <SkillIcon><DiJava /></SkillIcon> 
          <SkillIcon><FaJs /></SkillIcon>
          <SkillIcon><FaReact /></SkillIcon>
        </SkillsSection>
        <FlagsSection>
          <FlagIconWrapper>
            <FlagIcon country="GB" />
          </FlagIconWrapper>
          <FlagIconWrapper>
            <FlagIcon country="FR" />
          </FlagIconWrapper>
          <FlagIconWrapper>
            <FlagIcon country="ES" />
          </FlagIconWrapper>
          <FlagIconWrapper>
            <FlagIcon country="BD" />
          </FlagIconWrapper>
        </FlagsSection>
      </ContentSection>
      <ImageContainer>
        <ColorfulImageWrapper onClick={handleImageClick}>
          <ColorfulImage gradient={gradient} />
          <RemixIcon />
        </ColorfulImageWrapper>
      </ImageContainer>
    </HomeWrapper>
  );
}

export default Home;
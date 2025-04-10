import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaLongArrowAltRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

const ExperienceContainer = styled.div`
  position: relative;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 30px;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-bottom: 5px;
    margin-bottom: 15px;
  }
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 15px;
  letter-spacing: 0.5px;
  color: ${props => props.active ? '#000' : '#777'};
  font-weight: ${props => props.active ? '600' : '400'};
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.active ? '#000' : 'transparent'};
    transition: all 0.2s ease;
  }
  
  &:hover {
    color: #000;
  }
`;

const SwipeIndicator = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    color: #888;
    font-size: 13px;
    gap: 8px;
    
    svg {
      animation: swipeHint 1.5s infinite;
    }
    
    @keyframes swipeHint {
      0% { transform: translateX(0); opacity: 0.5; }
      50% { transform: translateX(10px); opacity: 1; }
      100% { transform: translateX(0); opacity: 0.5; }
    }
  }
`;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  padding: 30px;
  background: #fafafa;
  border-right: 1px solid #eaeaea;
  
  @media (min-width: 768px) {
    width: 280px;
    flex-shrink: 0;
  }
  
  @media (max-width: 767px) {
    padding: 20px;
    border-right: none;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    flex-wrap: wrap;
  }
`;

const Company = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #222;
`;

const Role = styled.div`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
    font-size: 14px;
    opacity: 0.7;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #666;
  
  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      font-size: 13px;
      opacity: 0.7;
    }
  }
  
  @media (max-width: 767px) {
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 8px;
  }
`;

const CardContent = styled.div`
  padding: 30px;
  flex-grow: 1;
  background: white;
`;

const Description = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #444;
  line-height: 1.7;

  li {
    margin-bottom: 12px;
    position: relative;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 25px;
`;

const SkillTag = styled.span`
  padding: 4px 12px;
  background: #f5f5f5;
  color: #333;
  font-size: 13px;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  letter-spacing: 0.3px;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.disabled ? '#ccc' : '#222'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  letter-spacing: 0.3px;
  padding: 0;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    color: #000;
  }
  
  svg {
    font-size: 12px;
  }
`;

const MobileNavArrows = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none;
  }
`;

const NavArrow = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: #333;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  pointer-events: auto;
  opacity: ${props => props.disabled ? 0.3 : 1};
  
  &:active {
    background: #f8f8f8;
  }
`;

const ProgressIndicator = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-bottom: 20px;
  }
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#007bff' : '#ddd'};
  transition: background 0.3s ease;
`;

function Experience() {
    const [activeTab, setActiveTab] = useState(0);
    const [showSwipeHint, setShowSwipeHint] = useState(true);

    const experiences = [
        {
            id: 1,
            company: 'BRAC Institute of Governance',
            role: 'Research Intern',
            dateRange: 'March 2023 - May 2023',
            location: 'Dhaka, Bangladesh',
            description: [
                'Developed a Python-based tool using the ChatGPT API to generate climate-smart farming technologies',
                'Collaborated with researchers to ensure accuracy and relevance of generated information',
                'Contributed to documentation and research papers on sustainable agriculture'
            ],
            skills: ['Python', 'ChatGPT API', 'Research', 'Data Analysis']
        },
        {
            id: 2,
            company: 'Startup Bangladesh',
            role: 'Venture Capital Intern',
            dateRange: 'January 2023 - March 2023',
            location: 'Dhaka, Bangladesh',
            description: [
                'Assisted the ICT Division in evaluating investment opportunities',
                'Analyzed prospective startups and market trends',
                'Participated in due diligence processes and portfolio company meetings'
            ],
            skills: ['Investment Analysis', 'Market Research', 'Financial Modeling']
        },
        {
            id: 3,
            company: 'bKash',
            role: 'Software Development Intern',
            dateRange: 'December 2022 - January 2023',
            location: 'Dhaka, Bangladesh',
            description: [
                'Enhanced company\'s internal systems using Node.js development',
                'Gained hands-on experience with Amazon Web Services (AWS)',
                'Collaborated with senior developers on financial software solutions'
            ],
            skills: ['Node.js', 'AWS', 'Backend Development', 'Financial Tech']
        },
        {
            id: 4,
            company: 'Jeeon',
            role: 'Data Analysis Intern',
            dateRange: 'July 2021 - August 2021',
            location: 'Remote',
            description: [
                'Conducted web scraping to support the upgrade of retail pharmacies',
                'Improved healthcare access for low-income communities through data analysis',
                'Developed Python scripts for automated data collection and reporting'
            ],
            skills: ['Python', 'Web Scraping', 'Data Analysis', 'Healthcare Tech']
        },
        {
            id: 5,
            company: 'mPower',
            role: 'Research Assistant',
            dateRange: 'July 2019 - August 2019',
            location: 'Dhaka, Bangladesh',
            description: [
                'Conducted research for TraumaLink, an emergency response system',
                'Analyzed road traffic injury data to improve response times',
                'Contributed to the development of volunteer coordination systems'
            ],
            skills: ['Research', 'Data Analysis', 'Healthcare', 'Emergency Response']
        },
        {
            id: 6,
            company: 'Personal Projects',
            role: 'Full Stack Developer',
            dateRange: '2020 - Present',
            location: 'London, UK',
            description: [
                'Developed various web applications using React and Node.js',
                'Created data visualization tools for academic projects',
                'Built and maintained personal portfolio website with modern technologies'
            ],
            skills: ['React', 'Node.js', 'Full Stack', 'UI/UX', 'Web Development']
        }
    ];

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }, []);
    
    const navigatePrev = () => {
        if (activeTab > 0) {
          setActiveTab(prev => prev - 1);
          setShowSwipeHint(false);
        }
    };
    
    const navigateNext = () => {
        if (activeTab < experiences.length - 1) {
          setActiveTab(prev => prev + 1);
          setShowSwipeHint(false);
        }
    };
    
    const swipeHandlers = useSwipeable({
      onSwipedLeft: () => navigateNext(),
      onSwipedRight: () => navigatePrev(),
      trackMouse: false
    });

    return (
        <Container>            
            <TabsContainer>
                {experiences.map((exp, index) => (
                    <TabButton 
                        key={exp.id}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        {exp.company}
                    </TabButton>
                ))}
            </TabsContainer>
            
            {showSwipeHint && (
                <SwipeIndicator>
                    <FaChevronLeft />
                    Swipe to navigate
                    <FaChevronRight />
                </SwipeIndicator>
            )}
            
            <ExperienceContainer {...swipeHandlers}>
                <AnimatePresence mode="wait">
                    <CardContainer
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <CardHeader>
                            <Company>{experiences[activeTab].company}</Company>
                            <Role>
                                <FaBriefcase />
                                {experiences[activeTab].role}
                            </Role>
                            <MetaInfo>
                                <div>
                                    <FaCalendarAlt />
                                    {experiences[activeTab].dateRange}
                                </div>
                                <div>
                                    <FaMapMarkerAlt />
                                    {experiences[activeTab].location}
                                </div>
                            </MetaInfo>
                        </CardHeader>
                        <CardContent>
                            <Description>
                                {experiences[activeTab].description.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </Description>
                            <SkillsContainer>
                                {experiences[activeTab].skills.map((skill, index) => (
                                    <SkillTag key={index}>{skill}</SkillTag>
                                ))}
                            </SkillsContainer>
                        </CardContent>
                    </CardContainer>
                </AnimatePresence>
                
                <MobileNavArrows>
                    <NavArrow 
                        onClick={navigatePrev} 
                        disabled={activeTab === 0}
                    >
                        <FaChevronLeft />
                    </NavArrow>
                    <NavArrow 
                        onClick={navigateNext}
                        disabled={activeTab === experiences.length - 1}
                    >
                        <FaChevronRight />
                    </NavArrow>
                </MobileNavArrows>
                
                <ProgressIndicator>
                    {experiences.map((_, index) => (
                        <ProgressDot key={index} active={activeTab === index} />
                    ))}
                </ProgressIndicator>
                
                <NavButtons>
                    <NavButton 
                        onClick={navigatePrev} 
                        disabled={activeTab === 0}
                    >
                        <FaLongArrowAltRight style={{ transform: 'rotate(180deg)' }} />
                        Previous
                    </NavButton>
                    <NavButton 
                        onClick={navigateNext}
                        disabled={activeTab === experiences.length - 1}
                    >
                        Next
                        <FaLongArrowAltRight />
                    </NavButton>
                </NavButtons>
            </ExperienceContainer>
        </Container>
    );
}

export default Experience;
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight, FaLightbulb 
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  
  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
  max-width: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    width: calc(100% + 1rem);
  }
`;

const TabButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? '#111' : '#888'};
  font-size: 0.95rem;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 2px;
    width: ${props => props.active ? '80%' : '0'};
    background: ${props => props.active ? '#007bff' : 'transparent'};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.active ? '#111' : '#333'};
    
    &:after {
      width: ${props => props.active ? '80%' : '40%'};
      background: ${props => props.active ? '#007bff' : '#ddd'};
    }
  }
`;

const ExperienceContainer = styled.div`
  position: relative;
`;

const CardContainer = styled(motion.div)`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    width: calc(100% + 20px);
    margin-left: -10px;
    margin-right: -10px;
    border-radius: 12px;
  }
`;

const CardHeader = styled.div`
  padding: 2.5rem;
  background: #f9f9f9;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 1.75rem;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 4px;
    height: 40px;
    background: linear-gradient(to bottom, transparent, #007bff, transparent);
    transform: translateY(-50%);
    display: none;
    
    @media (min-width: 768px) {
      display: block;
    }
  }
`;

const Company = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const Role = styled.div`
  font-size: 1.1rem;
  color: #007bff;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  svg {
    font-size: 1rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #666;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: #888;
    }
  }
`;

const CardContent = styled.div`
  padding: 2.5rem;
  background: white;
  
  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`;

const Highlights = styled.ul`
  margin: 0 0 2rem 0;
  padding-left: 1.25rem;
  color: #444;
  line-height: 1.7;

  li {
    margin-bottom: 0.75rem;
    position: relative;
    
    &:before {
      content: '•';
      color: #007bff;
      position: absolute;
      left: -1rem;
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    font-size: 0.95rem;
    
    li {
      margin-bottom: 0.6rem;
    }
  }
`;

const CoursesContainer = styled.div`
  margin-top: 1rem;

  h4 {
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const CoursesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const CourseTag = styled.span`
  background: #f0f7ff;
  color: #0066cc;
  padding: 0.35rem 0.7rem;
  border-radius: 4px;
  font-size: 0.85rem;
  
  @media (max-width: 768px) {
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const SwipeIndicator = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 16px;
    
    span {
      margin-bottom: 6px;
      font-size: 14px;
      color: #666;
    }
    
    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    svg {
      animation: swipeHint 1.5s infinite;
    }
    
    @keyframes swipeHint {
      0% { transform: translateX(-5px); opacity: 0.6; }
      50% { transform: translateX(5px); opacity: 1; }
      100% { transform: translateX(-5px); opacity: 0.6; }
    }
  }
`;

const MobileNavArrows = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 5px;
    right: 5px;
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
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  pointer-events: auto;
  opacity: ${props => props.disabled ? 0.3 : 1};
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
  
  &:active {
    transform: scale(0.95);
    background: #f8f8f8;
  }
`;

const ProgressIndicator = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 16px 0;
  }
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#007bff' : '#ddd'};
  transition: background 0.3s ease, transform 0.3s ease;
  transform: ${props => props.active ? 'scale(1.3)' : 'scale(1)'};
  cursor: pointer;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
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

function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const tabsRef = useRef(null);
  
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabElement = tabsRef.current.children[activeTab];
      if (activeTabElement) {
        const containerWidth = tabsRef.current.offsetWidth;
        const tabWidth = activeTabElement.offsetWidth;
        const tabLeft = activeTabElement.offsetLeft;
        const scrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);
        
        tabsRef.current.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

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
      <TabsContainer ref={tabsRef}>
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
          <span>Card {activeTab + 1} of {experiences.length}: <strong>{experiences[activeTab].company}</strong></span>
          <div>
            <FaChevronLeft />
            Swipe to navigate
            <FaChevronRight />
          </div>
        </SwipeIndicator>
      )}
      
      <ExperienceContainer {...swipeHandlers}>
        <MobileNavArrows>
          <NavArrow 
            onClick={navigatePrev} 
            disabled={activeTab === 0}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </NavArrow>
          <NavArrow 
            onClick={navigateNext}
            disabled={activeTab === experiences.length - 1}
            aria-label="Next"
          >
            <FaChevronRight />
          </NavArrow>
        </MobileNavArrows>
        
        <AnimatePresence mode="wait">
          <CardContainer
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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
              <Highlights>
                {experiences[activeTab].description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Highlights>
              
              <CoursesContainer>
                <h4><FaLightbulb /> Skills Used</h4>
                <CoursesList>
                  {experiences[activeTab].skills.map((skill, index) => (
                    <CourseTag key={index}>{skill}</CourseTag>
                  ))}
                </CoursesList>
              </CoursesContainer>
            </CardContent>
          </CardContainer>
        </AnimatePresence>
        
        <ProgressIndicator>
          {experiences.map((_, index) => (
            <ProgressDot 
              key={index} 
              active={activeTab === index} 
              onClick={() => setActiveTab(index)}
            />
          ))}
        </ProgressIndicator>
        
        <NavButtons>
          <NavButton 
            onClick={navigatePrev} 
            disabled={activeTab === 0}
          >
            <FaChevronLeft />
            Previous
          </NavButton>
          <NavButton 
            onClick={navigateNext}
            disabled={activeTab === experiences.length - 1}
          >
            Next
            <FaChevronRight />
          </NavButton>
        </NavButtons>
      </ExperienceContainer>
    </Container>
  );
}

export default Experience;
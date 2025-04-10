import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, 
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
  
  @media (max-width: 768px) {
    padding: 2rem 0.5rem; /* Reduce side padding to maximize width */
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

const EducationContainer = styled.div`
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
    width: calc(100% + 20px); /* Extend card slightly beyond container */
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

const School = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #111;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const Degree = styled.div`
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
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding-left: 1rem;
    font-size: 0.95rem;
    
    li {
      margin-bottom: 0.6rem;
    }
  }

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
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const CourseTag = styled.span`
  background: #f0f7ff;
  color: #0066cc;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  
  @media (max-width: 768px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    white-space: nowrap;
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

const educations = [
  {
    id: 1,
    school: "Queen Mary University of London",
    degree: "MSci Computer Science",
    dateRange: "September 2023 - Present",
    location: "London, UK",
    description: [
      "Currently pursuing a Master's degree in Computer Science with focus on advanced programming, algorithms, and data science.",
      "Selected to participate in the university's tech innovation lab.",
      "Working on research projects in machine learning and natural language processing."
    ],
    subjects: ["Algorithms", "Data Structures", "Machine Learning", "Software Engineering", "Database Systems"]
  },
  {
    id: 2,
    school: "Lycée Français Charles de Gaulle",
    degree: "French Baccalauréat",
    dateRange: "September 2020 - June 2022",
    location: "London, UK",
    description: [
      "Completed the French Baccalauréat with highest distinction, following the scientific track with specializations in Mathematics and Physics-Chemistry.",
      "Achieved highest distinction (Mention Très Bien) with overall score of 18.5/20.",
      "Led a student team project on environmental sustainability."
    ],
    subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English Literature", "Philosophy"]
  },
  {
    id: 3,
    school: "Lycée Français Charles de Gaulle",
    degree: "French Brevet",
    dateRange: "September 2016 - June 2019",
    location: "London, UK",
    description: [
      "Completed the French Brevet (equivalent to GCSE) with highest honors.",
      "Achieved highest distinction (Mention Très Bien) with perfect scores in Mathematics and Science.",
      "Awarded academic excellence prize for top performance in year group."
    ],
    subjects: ["Mathematics", "Physics", "Biology", "French", "English", "History", "Geography"]
  }
];

function Education() {
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
    if (activeTab < educations.length - 1) {
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
        {educations.map((edu, index) => (
          <TabButton 
            key={edu.id}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {edu.school}
          </TabButton>
        ))}
      </TabsContainer>

      {showSwipeHint && (
        <SwipeIndicator>
          <span>Card {activeTab + 1} of {educations.length}: <strong>{educations[activeTab].school}</strong></span>
          <div>
            <FaChevronLeft />
            Swipe to navigate
            <FaChevronRight />
          </div>
        </SwipeIndicator>
      )}

      <EducationContainer {...swipeHandlers}>
        <AnimatePresence mode="wait">
          <CardContainer
            key={activeTab}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CardHeader>
              <School>{educations[activeTab].school}</School>
              <Degree>
                <FaGraduationCap />
                {educations[activeTab].degree}
              </Degree>
              <MetaInfo>
                <div>
                  <FaCalendarAlt />
                  {educations[activeTab].dateRange}
                </div>
                <div>
                  <FaMapMarkerAlt />
                  {educations[activeTab].location}
                </div>
              </MetaInfo>
            </CardHeader>
            <CardContent>
              <Highlights>
                {educations[activeTab].description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </Highlights>
              <CoursesContainer>
                <h4>
                  <FaGraduationCap /> Notable Coursework
                </h4>
                <CoursesList>
                  {educations[activeTab].subjects.map((subject, index) => (
                    <CourseTag key={index}>{subject}</CourseTag>
                  ))}
                </CoursesList>
              </CoursesContainer>
            </CardContent>
          </CardContainer>
        </AnimatePresence>

        <MobileNavArrows>
          <NavArrow 
            onClick={navigatePrev} 
            disabled={activeTab === 0}
            aria-label="Previous education"
          >
            <FaChevronLeft />
          </NavArrow>
          <NavArrow 
            onClick={navigateNext}
            disabled={activeTab === educations.length - 1}
            aria-label="Next education"
          >
            <FaChevronRight />
          </NavArrow>
        </MobileNavArrows>

        <ProgressIndicator>
          {educations.map((_, index) => (
            <ProgressDot key={index} active={activeTab === index} />
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
            disabled={activeTab === educations.length - 1}
          >
            Next
            <FaChevronRight />
          </NavButton>
        </NavButtons>
      </EducationContainer>
    </Container>
  );
}

export default Education;
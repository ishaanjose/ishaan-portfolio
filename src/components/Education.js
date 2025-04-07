import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaLongArrowAltRight } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const EducationContainer = styled.div`
  position: relative;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 30px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-bottom: 10px;
    margin-bottom: 20px;
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
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
    min-width: 120px; /* Ensure minimum touch target size */
    text-align: center;
  }
`;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
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
  }
`;

const School = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #222;
`;

const Degree = styled.div`
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
`;

const CardContent = styled.div`
  padding: 30px;
  flex-grow: 1;
  background: white;
`;

const Description = styled.div`
  margin: 0;
  color: #444;
  line-height: 1.7;
`;

const AchievementsList = styled.ul`
  margin: 15px 0 0 0;
  padding-left: 20px;
  
  li {
    margin-bottom: 12px;
    position: relative;
  }
`;

const SubjectsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 25px;
`;

const SubjectTag = styled.span`
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

function Education() {
    const [activeTab, setActiveTab] = useState(0);

    const educationItems = [
        {
            id: 1,
            school: "Queen Mary University of London",
            degree: "MSci Computer Science",
            dateRange: "September 2023 - Present",
            location: "London, UK",
            description: "Currently pursuing a Master's degree in Computer Science with focus on advanced programming, algorithms, and data science.",
            achievements: [
                "First-class honors in all modules completed to date",
                "Selected to participate in the university's tech innovation lab",
                "Working on research projects in machine learning and natural language processing"
            ],
            subjects: ["Algorithms", "Data Structures", "Machine Learning", "Software Engineering", "Database Systems"]
        },
        {
            id: 2,
            school: "Lycée Français Charles de Gaulle",
            degree: "French Baccalauréat",
            dateRange: "September 2020 - June 2022",
            location: "London, UK",
            description: "Completed the French Baccalauréat with highest distinction, following the scientific track with specializations in Mathematics and Physics-Chemistry.",
            achievements: [
                "Achieved highest distinction (Mention Très Bien) with overall score of 18.5/20",
                "Ranked in the top 5% of graduating class",
                "Led a student team project on environmental sustainability"
            ],
            subjects: ["Mathematics", "Physics", "Chemistry", "Computer Science", "English Literature", "Philosophy"]
        },
        {
            id: 3,
            school: "Lycée Français Charles de Gaulle",
            degree: "French Brevet",
            dateRange: "September 2016 - June 2019",
            location: "London, UK",
            description: "Completed the French Brevet (equivalent to GCSE) with highest honors.",
            achievements: [
                "Achieved highest distinction (Mention Très Bien) with perfect scores in Mathematics and Science",
                "Awarded academic excellence prize for top performance in year group",
                "Participated in national mathematics competition (Concours Kangourou)"
            ],
            subjects: ["Mathematics", "Physics", "Biology", "French", "English", "History", "Geography"]
        }
    ];
    
    const navigatePrev = () => {
        setActiveTab(prev => (prev === 0 ? prev : prev - 1));
    };
    
    const navigateNext = () => {
        setActiveTab(prev => (prev === educationItems.length - 1 ? prev : prev + 1));
    };

    return (
        <Container>
            
            <TabsContainer>
                {educationItems.map((edu, index) => (
                    <TabButton 
                        key={edu.id}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        {edu.school}
                    </TabButton>
                ))}
            </TabsContainer>
            
            <EducationContainer>
                <AnimatePresence mode="wait">
                    <CardContainer
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <CardHeader>
                            <School>{educationItems[activeTab].school}</School>
                            <Degree>
                                <FaGraduationCap />
                                {educationItems[activeTab].degree}
                            </Degree>
                            <MetaInfo>
                                <div>
                                    <FaCalendarAlt />
                                    {educationItems[activeTab].dateRange}
                                </div>
                                <div>
                                    <FaMapMarkerAlt />
                                    {educationItems[activeTab].location}
                                </div>
                            </MetaInfo>
                        </CardHeader>
                        <CardContent>
                            <Description>{educationItems[activeTab].description}</Description>
                            <AchievementsList>
                                {educationItems[activeTab].achievements.map((achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                ))}
                            </AchievementsList>
                            <SubjectsContainer>
                                {educationItems[activeTab].subjects.map((subject, index) => (
                                    <SubjectTag key={index}>{subject}</SubjectTag>
                                ))}
                            </SubjectsContainer>
                        </CardContent>
                    </CardContainer>
                </AnimatePresence>
                
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
                        disabled={activeTab === educationItems.length - 1}
                    >
                        Next
                        <FaLongArrowAltRight />
                    </NavButton>
                </NavButtons>
            </EducationContainer>
        </Container>
    );
}

export default Education;
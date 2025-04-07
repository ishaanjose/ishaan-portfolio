import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaLongArrowAltRight } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
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

function Experience() {
    const [activeTab, setActiveTab] = useState(0);

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
    
    const navigatePrev = () => {
        setActiveTab(prev => (prev === 0 ? prev : prev - 1));
    };
    
    const navigateNext = () => {
        setActiveTab(prev => (prev === experiences.length - 1 ? prev : prev + 1));
    };

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
            
            <ExperienceContainer>
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
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaCode, FaChevronDown } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  padding: 10px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  height: ${props => props.isExpanded ? 'auto' : '140px'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #007bff, #00d4ff);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const CardHeader = styled.div`
  padding: 20px;
  position: relative;
  background: white;
`;

const Company = styled.h2`
  font-size: 20px;
  color: #007bff;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Role = styled.h3`
  font-size: 16px;
  color: #444;
  margin: 0 0 15px 0;
  font-weight: 500;
`;

const Duration = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  gap: 8px;
`;

const ExpandButton = styled(motion.div)`
  position: absolute;
  right: 20px;
  top: 20px;
  color: #007bff;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;
`;

const CardContent = styled(motion.div)`
  padding: 0 20px 20px;
  background: white;
`;

const Description = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #555;
  line-height: 1.6;

  li {
    margin-bottom: 8px;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const SkillTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: #f0f7ff;
  color: #007bff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

function Experience() {
    const [expandedStates, setExpandedStates] = useState({});

    const toggleCard = (e, id) => {
        e.stopPropagation();
        setExpandedStates(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const experiences = [
        {
            id: 1,
            company: 'BRAC Institute of Governance',
            role: 'Research Intern',
            dateRange: 'March 2023 - May 2023',
            description: [
                'Developed a Python-based tool using the ChatGPT API to generate climate-smart farming technologies',
                'Collaborated with researchers to ensure accuracy and relevance of generated information',
            ],
            skills: ['Python', 'ChatGPT API', 'Research', 'Data Analysis']
        },
        {
            id: 2,
            company: 'Startup Bangladesh',
            role: 'Venture Capital Intern',
            dateRange: 'January 2023 - March 2023',
            description: [
                'Assisted the ICT Division in evaluating investment opportunities',
                'Analyzed prospective startups and market trends',
            ],
            skills: ['Investment Analysis', 'Market Research']
        },
        {
            id: 3,
            company: 'bKash',
            role: 'Software Development Intern',
            dateRange: 'December 2022 - January 2023',
            description: [
                'Enhanced company\'s internal systems using Node.js development',
                'Gained hands-on experience with Amazon Web Services (AWS)',
            ],
            skills: ['Node.js', 'AWS', 'Backend Development']
        },
        {
            id: 4,
            company: 'Jeeon',
            role: 'Data Analysis Intern',
            dateRange: 'July 2021 - August 2021',
            description: [
                'Conducted web scraping to support the upgrade of retail pharmacies',
                'Improved healthcare access for low-income communities through data analysis',
                'Developed Python scripts for automated data collection',
            ],
            skills: ['Python', 'Web Scraping', 'Data Analysis', 'Healthcare Tech']
        },
        {
            id: 5,
            company: 'mPower',
            role: 'Research Assistant',
            dateRange: 'July 2019 - August 2019',
            description: [
                'Conducted research for TraumaLink, an emergency response system',
                'Analyzed road traffic injury data to improve response times',
                'Contributed to the development of volunteer coordination systems',
            ],
            skills: ['Research', 'Data Analysis', 'Healthcare', 'Emergency Response']
        },
        {
            id: 6,
            company: 'Personal Projects',
            role: 'Full Stack Developer',
            dateRange: '2020 - Present',
            description: [
                'Developed various web applications using React and Node.js',
                'Created data visualization tools for academic projects',
                'Built and maintained personal portfolio website',
            ],
            skills: ['React', 'Node.js', 'Full Stack', 'UI/UX', 'Web Development']
        }
    ];

    return (
        <Container>
            <Grid>
                {experiences.map((exp) => (
                    <Card
                        key={exp.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        isExpanded={expandedStates[exp.id]}
                    >
                        <CardHeader onClick={(e) => toggleCard(e, exp.id)}>
                            <Company>
                                <FaBriefcase /> {exp.company}
                            </Company>
                            <Role>{exp.role}</Role>
                            <Duration>
                                <FaCalendarAlt />
                                {exp.dateRange}
                            </Duration>
                            <ExpandButton isOpen={expandedStates[exp.id]}>
                                <FaChevronDown />
                            </ExpandButton>
                        </CardHeader>
                        <AnimatePresence>
                            {expandedStates[exp.id] && (
                                <CardContent
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Description>
                                        {exp.description.map((desc, index) => (
                                            <li key={index}>{desc}</li>
                                        ))}
                                    </Description>
                                    <SkillsContainer>
                                        {exp.skills.map((skill, index) => (
                                            <SkillTag key={index}>
                                                <FaCode />
                                                {skill}
                                            </SkillTag>
                                        ))}
                                    </SkillsContainer>
                                </CardContent>
                            )}
                        </AnimatePresence>
                    </Card>
                ))}
            </Grid>
        </Container>
    );
}

export default Experience;
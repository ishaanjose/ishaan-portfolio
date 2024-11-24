import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`;

const TimelineWrapper = styled.div`
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #007bff 0%, #00d4ff 100%);
  }
`;

const EducationItem = styled(motion.div)`
  position: relative;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -50px;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    border: 2px solid #007bff;
    z-index: 1;
  }
`;

const GradIcon = styled(FaGraduationCap)`
  position: absolute;
  left: -43px;
  top: 7px;
  color: #007bff;
  z-index: 2;
  font-size: 16px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateX(10px);
    transition: transform 0.3s ease;
  }
`;

const Degree = styled.h2`
  font-size: 22px;
  color: #007bff;
  margin: 0 0 10px 0;
`;

const School = styled.h3`
  font-size: 18px;
  color: #444;
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const Date = styled.div`
  display: inline-block;
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  padding: 4px 12px;
  background: #f8f9fa;
  border-radius: 20px;
`;

const Details = styled.p`
  margin: 0;
  color: #555;
  line-height: 1.6;
  font-size: 15px;

  strong {
    color: #007bff;
    font-weight: 600;
  }

  em {
    color: #444;
    font-style: normal;
    font-weight: 500;
  }
`;

function Education() {
    const educationItems = [
        {
            id: 1,
            degree: 'MSci Computer Science',
            school: "Queen Mary's University of London",
            date: 'September 2023 - Present',
            details: 'Focusing on <strong>Computer Science</strong>, <em>Software Engineering</em>, and <em>Data Science</em>',
        },
        {
            id: 2,
            degree: 'French Baccalauréat',
            school: 'Lycée Français Charles de Gaulle, London',
            date: 'Graduated June 2022',
            details: 'Achieved Highest Distinction with specializations in <strong>Mathematics</strong>, <strong>Computer Science</strong>, <em>Physics</em> and <em>Chemistry</em>',
        },
        {
            id: 3,
            degree: 'French Brevet',
            school: 'Lycée Français Charles de Gaulle, London',
            date: 'Graduated June 2019',
            details: 'Achieved Highest Distinction (GCSE equivalent) with excellence in <strong>Mathematics</strong> and <em>Sciences</em>',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <Container>
            <TimelineWrapper
                as={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {educationItems.map((item) => (
                    <EducationItem key={item.id} variants={itemVariants}>
                        <GradIcon />
                        <Card>
                            <Degree>{item.degree}</Degree>
                            <School>{item.school}</School>
                            <Date>{item.date}</Date>
                            <Details dangerouslySetInnerHTML={{ __html: item.details }} />
                        </Card>
                    </EducationItem>
                ))}
            </TimelineWrapper>
        </Container>
    );
}

export default Education;
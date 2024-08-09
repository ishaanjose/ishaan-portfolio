import React from 'react';
import styled from 'styled-components';

const EducationWrapper = styled.div`
    max-width: 1000px; /* Increased the max-width */
    margin: 0 auto;
`;

const EducationItem = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    padding: 30px; /* Increased the padding */
    transition: transform 0.3s, box-shadow 0.3s;
    width: 100%; /* Make the container take full width */

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
`;

const Degree = styled.h2`
    font-size: 22px; /* Increased the font size */
    margin-bottom: 5px;
`;

const Institution = styled.h3`
    font-size: 20px; /* Increased the font size */
    color: #555;
    margin-bottom: 5px;
`;

const GraduationDate = styled.p`
    color: #888;
    font-size: 16px; /* Increased the font size */
    margin-bottom: 10px;
`;

const Description = styled.p`
    line-height: 1.6;
`;

function Education() {
    const educationItems = [
        {
            id: 1,
            degree: 'MSci Computer Science',
            institution: "Queen Mary's University of London",
            graduationDate: 'September 2023 - Present',
            description: '',
        },
        {
            id: 2,
            degree: 'French Baccalauréat with Highest Distinction',
            institution: 'Lycée Français Charles de Gaulle, London',
            graduationDate: 'Graduated June 2022',
            description: 'Specializations: Maths, Computer Science, Physics and Chemistry',
        },
        {
            id: 3,
            degree: 'French Brevet (GCSE equivalent) with Highest Distinction',
            institution: 'Lycée Français Charles de Gaulle, London',
            graduationDate: 'Graduated June 2019',
            description: '',
        },
        // Add more education items as needed
    ];

    return (
        <EducationWrapper>
            {educationItems.map(edu => (
                <EducationItem key={edu.id}>
                    <Degree>{edu.degree}</Degree>
                    <Institution>{edu.institution}</Institution>
                    <GraduationDate>{edu.graduationDate}</GraduationDate>
                    <Description>{edu.description}</Description>
                </EducationItem>
            ))}
        </EducationWrapper>
    );
}

export default Education;
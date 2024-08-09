import React from 'react';
import styled from 'styled-components';

const ExperienceWrapper = styled.div`
    max-width: 1000px; /* Increased the max-width */
    margin: 0 auto;
`;

const ExperienceItem = styled.div`
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

const JobTitle = styled.h2`
    font-size: 22px; /* Increased the font size */
    margin-bottom: 5px;
`;

const Company = styled.h3`
    font-size: 20px; /* Increased the font size */
    color: #555;
    margin-bottom: 5px;
`;

const DateRange = styled.p`
    color: #888;
    font-size: 16px; /* Increased the font size */
    margin-bottom: 10px;
`;

const Description = styled.ul`
    line-height: 1.6;
    padding-left: 20px;
`;

const DescriptionItem = styled.li`
    margin-bottom: 10px;
`;

function Experience() {
    const experiences = [
        {
            id: 1,
            title: 'Intern',
            company: 'BRAC Institute of Governance and Development (BIGD)',
            dateRange: 'March 2023 - May 2023',
            description: [
                'Developed a Python-based tool using the ChatGPT API to generate climate-smart farming technologies for Bangladeshi farmers',
                'Collaborated with researchers to ensure accuracy and relevance of generated information',
            ],
        },
        {
            id: 2,
            title: 'Intern',
            company: 'Startup Bangladesh (Venture Capital)',
            dateRange: 'January 2023 - March 2023',
            description: [
                'Assisted the ICT Division in evaluating investment opportunities and analyzing prospective startups',
            ],
        },
        {
            id: 3,
            title: 'Intern',
            company: 'bKash',
            dateRange: 'December 2022 - January 2023',
            description: [
                'Enhanced company\'s internal systems using Node.js development',
                'Gained hands-on experience with Amazon Web Services (AWS)',
            ],
        },
        {
            id: 4,
            title: 'Intern',
            company: 'Jeeon',
            dateRange: 'July 2021 - August 2021',
            description: [
                'Conducted web scraping to support the upgrade of retail pharmacies, improving healthcare access for low-income communities',
                'Utilized Python for data collection and analysis',
            ],
        },
        {
            id: 5,
            title: 'Intern',
            company: 'mPower',
            dateRange: 'July 2019 - August 2019',
            description: [
                'Conducted research for TraumaLink, a volunteer-based emergency response system for road traffic injury victims',
            ],
        },
    ];

    return (
        <ExperienceWrapper>
            {experiences.map(exp => (
                <ExperienceItem key={exp.id}>
                    <JobTitle>{exp.title}</JobTitle>
                    <Company>{exp.company}</Company>
                    <DateRange>{exp.dateRange}</DateRange>
                    <Description>
                        {exp.description.map((desc, index) => (
                            <DescriptionItem key={index}>{desc}</DescriptionItem>
                        ))}
                    </Description>
                </ExperienceItem>
            ))}
        </ExperienceWrapper>
    );
}

export default Experience;
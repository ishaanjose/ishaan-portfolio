import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardWrapper = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f5f5f5;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  color: #111;
  margin: 0 0 0.5rem 0;
`;

const CardSubtitle = styled.div`
  font-size: 0.95rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  svg {
    font-size: 0.8rem;
    color: #777;
  }
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #777;
  
  & > div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  svg {
    font-size: 0.8rem;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  color: #444;
  line-height: 1.6;
  
  p {
    margin: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    margin: 0;
    padding-left: 1.2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const Card = ({ children, ...props }) => {
  return (
    <CardWrapper 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

export const CardHead = ({ title, subtitle, meta, ...props }) => {
  return (
    <CardHeader {...props}>
      {title && <CardTitle>{title}</CardTitle>}
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
      {meta && <CardMeta>{meta}</CardMeta>}
    </CardHeader>
  );
};

export const CardBody = ({ children, ...props }) => {
  return (
    <CardContent {...props}>
      {children}
    </CardContent>
  );
};
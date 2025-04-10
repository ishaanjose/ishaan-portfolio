import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import profilePic from '../assets/image.png';

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: ${props => props.isScrolled ? '100px' : '250px'};
  transition: height 0.3s ease;
  
  @media (max-width: 768px) {
    height: ${props => props.isScrolled ? '70px' : '180px'};
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.isScrolled ? '10px 0 0 0' : '40px 0 0 0'};
  box-sizing: border-box;
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    padding: ${props => props.isScrolled ? '5px 0 0 0' : '20px 0 0 0'};
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: ${props => props.isScrolled ? '60px' : '100px'};
  height: ${props => props.isScrolled ? '60px' : '100px'};
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: ${props => props.isScrolled ? '5px' : '15px'};
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: ${props => props.isScrolled ? '40px' : '70px'};
    height: ${props => props.isScrolled ? '40px' : '70px'};
  }
`;

const Name = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #333;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${props => props.isScrolled ? '0' : '1'};
  transform: translateY(${props => props.isScrolled ? '-10px' : '0'});
  height: ${props => props.isScrolled ? '0' : 'auto'};
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: ${props => props.isScrolled ? '10px 0' : '20px 0'};
  transition: padding 0.3s ease;
  
  @media (max-width: 768px) {
    gap: 15px;
    padding: 5px 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
    padding-left: 10px;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NavItem = styled(Link)`
  font-size: ${props => props.$isScrolled ? '15px' : '17px'};
  text-decoration: none;
  color: ${props => props.$active ? '#007bff' : '#666'};
  padding: 5px 0;
  border-bottom: 2px solid ${props => props.$active ? '#007bff' : 'transparent'};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: #007bff;
  }
  
  @media (max-width: 768px) {
    font-size: ${props => props.$isScrolled ? '12px' : '14px'};
    padding: 6px 0;
  }
`;

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <HeaderContent isScrolled={isScrolled}>
        <TopSection>
          <ProfileImage src={profilePic} alt="Profile" isScrolled={isScrolled} />
          <Name isScrolled={isScrolled}>Ishaan Jose</Name>
        </TopSection>
        <Navigation isScrolled={isScrolled}>
          <NavItem to="/" $active={path === '/'} $isScrolled={isScrolled}>About</NavItem>
          <NavItem to="/blog" $active={path === '/blog'} $isScrolled={isScrolled}>Blog</NavItem>
          <NavItem to="/experience" $active={path === '/experience'} $isScrolled={isScrolled}>Experience</NavItem>
          <NavItem to="/education" $active={path === '/education'} $isScrolled={isScrolled}>Education</NavItem>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
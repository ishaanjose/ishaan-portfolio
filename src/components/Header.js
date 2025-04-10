import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import profilePic from '../assets/image.png';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85);
`;

const HeaderContainer = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  color: #111;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  font-size: 1rem;
  text-decoration: none;
  color: ${props => props.$active ? '#111' : '#666'};
  font-weight: ${props => props.$active ? '500' : '400'};
  padding-bottom: 2px;
  transition: color 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 1px;
    background-color: #111;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #111;
    
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #111;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }
`;

const MobileNavWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  z-index: 1001;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const MobileNavLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: ${props => props.$active ? '#111' : '#666'};
  font-weight: ${props => props.$active ? '500' : '400'};
`;

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <ProfileImage src={profilePic} alt="Ishaan Jose" />
          <Name>Ishaan Jose</Name>
        </Logo>
        
        <NavLinks>
          <NavLink to="/" $active={path === '/'}>About</NavLink>
          <NavLink to="/blog" $active={path === '/blog'}>Blog</NavLink>
          <NavLink to="/experience" $active={path === '/experience'}>Experience</NavLink>
          <NavLink to="/education" $active={path === '/education'}>Education</NavLink>
        </NavLinks>
        
        <MobileMenuButton 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContainer>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNavWrapper
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <MobileNavHeader>
              <Logo to="/" onClick={() => setMobileMenuOpen(false)}>
                <ProfileImage src={profilePic} alt="Ishaan Jose" />
                <Name>Ishaan Jose</Name>
              </Logo>
              <MobileMenuButton 
                onClick={() => setMobileMenuOpen(false)} 
                aria-label="Close menu"
              >
                <FaTimes />
              </MobileMenuButton>
            </MobileNavHeader>
            
            <MobileNavLinks>
              <MobileNavLink 
                to="/" 
                $active={path === '/'} 
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </MobileNavLink>
              <MobileNavLink 
                to="/blog" 
                $active={path === '/blog'} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </MobileNavLink>
              <MobileNavLink 
                to="/experience" 
                $active={path === '/experience'} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience
              </MobileNavLink>
              <MobileNavLink 
                to="/education" 
                $active={path === '/education'} 
                onClick={() => setMobileMenuOpen(false)}
              >
                Education
              </MobileNavLink>
            </MobileNavLinks>
          </MobileNavWrapper>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
}

export default Header;
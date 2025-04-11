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
  z-index: 1000; /* Increased z-index to ensure visibility */
  background: #ffffff; /* Solid background instead of transparent */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); /* Add shadow for better visibility */
`;

const HeaderContainer = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem; /* Slightly less padding for mobile */
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 1.5rem;
  font-weight: 1000;
  color: #111;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
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
  font-size: 1.5rem; /* Increased size for better visibility */
  color: #007bff; /* Changed to blue for better visibility */
  cursor: pointer;
  padding: 8px;
  margin-right: -8px; /* Offset the padding */
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    transition: background-color 0.2s;
    border-radius: 50%;
    
    &:active {
      background-color: rgba(0, 123, 255, 0.1); /* Blue highlight when pressed */
    }
  }
`;

const MobileNavOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const MobileNavWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  max-width: 320px;
  background-color: #ffffff;
  z-index: 1002;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileNavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-top: 2rem;
`;

const MobileNavItem = styled(motion.div)`
  opacity: 0;
`;

const MobileNavLink = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  color: ${props => props.$active ? '#007bff' : '#333'};
  font-weight: ${props => props.$active ? '500' : '400'};
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const menuVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: custom => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.1, duration: 0.3 }
  })
};

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Close menu when path changes (navigation occurs)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  const navItems = [
    { path: '/', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/experience', label: 'Experience' },
    { path: '/education', label: 'Education' }
  ];
  
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <ProfileImage src={profilePic} alt="Ishaan Jose" />
          <Name>Ishaan Jose</Name>
        </Logo>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              $active={path === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        
        <MobileMenuButton 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-label="Toggle menu"
        >
          <FaBars />
        </MobileMenuButton>
      </HeaderContainer>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <MobileNavOverlay
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileNavWrapper
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
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
                {navItems.map((item, index) => (
                  <MobileNavItem 
                    key={item.path}
                    custom={index + 1} 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <MobileNavLink 
                      to={item.path} 
                      $active={path === item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </MobileNavLink>
                  </MobileNavItem>
                ))}
              </MobileNavLinks>
            </MobileNavWrapper>
          </>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
}

export default Header;
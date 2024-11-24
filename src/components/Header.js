import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import profilePic from '../assets/profile_pic.jpeg';

const HeaderContainer = styled.header`
  width: 100%;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 250px;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
  box-sizing: border-box;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Name = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #333;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  padding: 20px 0;
`;

const NavItem = styled(Link)`
  font-size: 17px;
  text-decoration: none;
  color: ${props => props.$active ? '#007bff' : '#666'};
  padding: 5px 0;
  border-bottom: 2px solid ${props => props.$active ? '#007bff' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    color: #007bff;
  }
`;

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <HeaderContainer>
      <HeaderContent>
        <TopSection>
          <ProfileImage src={profilePic} alt="Profile" />
          <Name>Ishaan Jose</Name>
        </TopSection>
        <Navigation>
          <NavItem to="/" $active={path === '/'}>About</NavItem>
          <NavItem to="/blog" $active={path === '/blog'}>Blog</NavItem>
          <NavItem to="/experience" $active={path === '/experience'}>Experience</NavItem>
          <NavItem to="/education" $active={path === '/education'}>Education</NavItem>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
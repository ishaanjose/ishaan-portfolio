import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import profilePic from '../assets/profile_pic.jpeg';

const HeaderWrapper = styled.header`
    text-align: center;
    margin-bottom: 40px;
    padding: 20px 0;
`;

const Avatar = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-bottom: 10px;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const Name = styled.h1`
    font-size: 24px;
    margin-bottom: 15px;
    color: #333;
`;

const Nav = styled.nav`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
    margin: 0 15px;
    text-decoration: none;
    color: #555;
    font-size: 16px;
    position: relative;
    transition: color 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: #007bff;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover, &.active {
        color: #007bff;
    }

    &:hover::after, &.active::after {
        transform: scaleX(1);
    }
`;

function Header() {
    return (
        <HeaderWrapper>
            <Avatar src={profilePic} alt="Ishaan Jose" />
            <Name>Ishaan Jose</Name>
            <Nav>
                <StyledNavLink to="/" end>About</StyledNavLink>
                <StyledNavLink to="/blog">Blog</StyledNavLink>
                <StyledNavLink to="/experience">Experience</StyledNavLink>
                <StyledNavLink to="/education">Education</StyledNavLink>
            </Nav>
        </HeaderWrapper>
    );
}

export default Header;
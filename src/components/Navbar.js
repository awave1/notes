import { Link } from 'gatsby';
import React from 'react';
import styled from '@emotion/styled';
import Switch from './Switch';

const Nav = styled.nav`
  background-color: ${props => props.theme.primaryColor};
`;

const NavContent = styled.div`
  margin: 0 auto;
  max-width: 41rem;
  padding: 1.45rem 1.0875rem;
  display: flex;
  align-items: center;
`;

const NavHeader = styled(Link)`
  color: ${props => props.theme.secondaryColor};
  text-decoration: none;
  text-shadow: none;
  background-image: none;
  font-family: Hack, monospace;
`;

const SwitchContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const SwitchCounter = styled.span`
  margin-right: 10px;
  color: #f5f5f6;
  font-size: 12px;

  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const Navbar = ({ siteTitle, onThemeChanged }) => {
  return (
    <Nav>
      <NavContent>
        <NavHeader to="/">{siteTitle}</NavHeader>
        <SwitchContainer>
          <Switch onChange={onThemeChanged} />
        </SwitchContainer>
      </NavContent>
    </Nav>
  );
};

export default Navbar;

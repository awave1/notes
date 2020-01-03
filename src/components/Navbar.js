import { Link } from 'gatsby';
import { React, useState } from 'react';
import styled from '@emotion/styled';
import Switch from './Switch';
import { hasDarkMode } from '../utils/domUtils';

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

const Navbar = ({ siteTitle, onThemeChanged }) => {
  const [isChecked, setChecked] = useState(hasDarkMode());

  const themeChanged = event => {
    setChecked(!isChecked);
    onThemeChanged(event);
  };

  return (
    <Nav>
      <NavContent>
        <NavHeader to="/">{siteTitle}</NavHeader>
        <SwitchContainer>
          <Switch onChange={themeChanged} checked={isChecked} />
        </SwitchContainer>
      </NavContent>
    </Nav>
  );
};

export default Navbar;

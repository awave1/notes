import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Switch from './Switch';

const Nav = styled.nav`
  background: #212121;
  box-shadow: 0px 0px 50px #0000001a;
`;

const NavContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  align-items: center;
`;

const NavHeader = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-shadow: none;
  background-image: none;
  font-family: monospace;
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

const Navbar = ({ siteTitle, onThemeChanged, switchCounter }) => {
  return (
    <Nav>
      <NavContent>
        <NavHeader to="/">{siteTitle}</NavHeader>
        <SwitchContainer>
          {switchCounter > 5 && (
            <SwitchCounter>
              Look, I just flipped the switch {switchCounter} times!
            </SwitchCounter>
          )}
          <Switch onChange={onThemeChanged} />
        </SwitchContainer>
      </NavContent>
    </Nav>
  );
};

export default Navbar;

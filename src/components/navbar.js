import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #202124;
  margin-bottom: 1.45rem;
`;

const NavContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const NavHeader = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-shadow: none;
  background-image: none;
`;

const Navbar = ({ siteTitle, usePrimaryNav }) => {
  return (
    <Nav>
      <NavContent>
        <NavHeader to="/">{siteTitle}</NavHeader>
      </NavContent>
    </Nav>
  );
};

export default Navbar;

import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background: ${props => (props.primary ? '#202124' : '#fbfbfb')};
  margin-bottom: 1.45rem;
`;

const NavContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const NavHeader = styled(Link)`
  color: ${props => (props.primary ? '#fff' : '#202124')};
  text-decoration: none;
  text-shadow: none;
  background-image: none;
`;

const Navbar = ({ siteTitle, sm }) => {
  return (
    <Nav primary={!sm}>
      <NavContent>
        <NavHeader primary={!sm} to="/">
          {siteTitle}
        </NavHeader>
      </NavContent>
    </Nav>
  );
};

export default Navbar;

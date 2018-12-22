import { Link } from 'gatsby';
import PropTypes from 'prop-types';
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
  color: white;
  text-decoration: none;
  text-shadow: none;
  background-image: none;
`;

const Navbar = ({ siteTitle }) => (
  <Nav>
    <NavContent>
      <NavHeader to="/">{siteTitle}</NavHeader>
    </NavContent>
  </Nav>
);

Navbar.propTypes = {
  siteTitle: PropTypes.string,
};

Navbar.defaultProps = {
  siteTitle: '',
};

export default Navbar;

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

const NavHeader = styled.h1`
  margin: 0;
`;

const Navbar = ({ siteTitle }) => (
  <Nav>
    <NavContent>
      <NavHeader>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </NavHeader>
    </NavContent>
  </Nav>
);

Navbar.propTypes = {
  siteTitle: PropTypes.string,
};

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;

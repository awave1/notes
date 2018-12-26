import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Navbar from './Navbar';
import { rhythm } from '../utils/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 960px;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  padding-top: 0;
`;

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Navbar siteTitle={data.site.siteMetadata.title} />
            <Container>{children}</Container>
          </>
        )}
      />
    );
  }
}

export default Layout;

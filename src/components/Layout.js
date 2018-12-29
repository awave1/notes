import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import Transition from '../components/Transition';
import Navbar from './Navbar';
import { rhythm } from '../utils/typography';
import log from '../utils/log';

const Content = styled.div`
  display: flex;
  max-width: 960px;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  margin: 0 auto;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.secondaryColor};
  transition: all 150ms cubic-bezier(0.55, 0, 0.1, 1);

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => props.theme.secondaryColor};
    transition: all 150ms cubic-bezier(0.55, 0, 0.1, 1);
  }
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.theme = {
      light: {
        primaryColor: '#f5f5f6',
        secondaryColor: 'black',
        card: {
          background: '#f5f5f6',
        },
      },
      dark: {
        primaryColor: '#212121',
        secondaryColor: 'white',
        card: {
          background: '#191919',
        },
      },
    };

    this.state = {
      theme: this.theme.light,
    };

    this.onThemeChanged = this.onThemeChanged.bind(this);
  }

  async onThemeChanged({ target }) {
    await this.setState({
      theme: target.checked ? this.theme.dark : this.theme.light,
    });

    document.body.style.background = this.state.theme.primaryColor;
  }

  render() {
    const { children, location } = this.props;
    const { theme } = this.state;

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
            <Navbar
              siteTitle={data.site.siteMetadata.title}
              onThemeChanged={this.onThemeChanged}
            />
            <ThemeProvider theme={theme}>
              <Transition
                location={location}
                backgroundColor={theme.primaryColor}
              >
                <ContentWrapper>
                  <Content>{children}</Content>
                </ContentWrapper>
              </Transition>
            </ThemeProvider>
          </>
        )}
      />
    );
  }
}

export default Layout;

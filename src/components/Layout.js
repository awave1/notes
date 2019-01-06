import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import Transition from '../components/Transition';
import Navbar from './Navbar';
import { rhythm } from '../utils/Typography';

const Content = styled.div`
  display: flex;
  max-width: 41rem;
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

  code.language-text {
    color: ${props => props.theme.code.primaryColor};
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
        code: {
          primaryColor: '#1a1a1a',
        },
        tag: {
          background: '#e0e0e080',
          hover: {
            background: '#e0e0e0',
          },
        },
      },
      dark: {
        primaryColor: '#212121',
        secondaryColor: 'white',
        card: {
          background: '#191919',
        },
        code: {
          primaryColor: '#f5f5f6',
        },
        tag: {
          background: '#ffffffe6',
          hover: {
            background: '#fff',
          },
        },
      },
    };

    this.state = {
      theme: this.theme.light,
      switchCounter: 0,
    };

    this.onThemeChanged = this.onThemeChanged.bind(this);
  }

  async onThemeChanged({ target }) {
    await this.setState({
      theme: target.checked ? this.theme.dark : this.theme.light,
      switchCounter: this.state.switchCounter + 1,
    });

    if (target.checked) {
      document.body.classList.remove('body__light');
      document.body.classList.add('body__dark');
    } else {
      document.body.classList.remove('body__dark');
      document.body.classList.add('body__light');
    }

    document.body.style.background = this.state.theme.primaryColor;
  }

  render() {
    const { children, location } = this.props;
    const { theme, switchCounter } = this.state;

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
              siteTitle={`/${data.site.siteMetadata.title}`}
              onThemeChanged={this.onThemeChanged}
              switchCounter={switchCounter}
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

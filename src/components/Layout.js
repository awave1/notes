import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { withTheme, ThemeProvider } from 'emotion-theming';
import Transition from './Transition';
import Navbar from './Navbar';
import { rhythm } from '../utils/Typography';
import useDarkMode from 'use-dark-mode';

const Content = styled.div`
  display: flex;
  max-width: 41rem;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  margin: 0 auto;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  background: ${props => props.theme.main.background};
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

  code,
  pre {
    font-family: Hack, monospace;
  }

  code.language-text {
    color: ${props => props.theme.code.primaryColor};
  }

  blockquote {
    border-left: ${props => props.theme.blockquote.borderLeft};
    color: ${props => props.theme.blockquote.color};
    padding: 0 1em;
  }
`;

const appTheme = {
  light: {
    primaryColor: '#ececec',
    secondaryColor: 'black',
    main: {
      background: '#fff',
    },
    card: {
      background: '#fff',
      borderColor: '#cccccc7d',

      hover: {
        borderColor: '#cccccca8',
      },
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
    blockquote: {
      color: '#6a737d',
      borderLeft: '0.25em solid #dfe2e5',
    },
  },
  dark: {
    primaryColor: '#191919',
    secondaryColor: 'white',
    main: {
      background: '#212121',
    },
    card: {
      background: '#191919',
      borderColor: '#ffffff47',

      hover: {
        borderColor: '#ffffff5e',
      },
    },
    code: {
      primaryColor: '#f5f5f6',
    },
    tag: {
      background: '#101010',
      hover: {
        background: '#fff',
      },
    },
    blockquote: {
      color: '#958C82',
      borderLeft: '0.25em solid #958C82',
    },
  },
};

const makeGlobalStyles = theme => css`
  body {
    background: ${theme.main.background};
    transition: background 150ms cubic-bezier(0.55, 0, 0.1, 1);
  }
`;

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
));

function Layout({ children, location }) {
  const darkMode = useDarkMode();
  const [theme, setTheme] = useState(
    darkMode.value ? appTheme.dark : appTheme.light
  );

  const onThemeChanged = ({ target }) =>
    setTheme(target.checked ? appTheme.dark : appTheme.light);

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
          <Helmet>
            <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/hack-font@3/build/web/hack.css"
            />
          </Helmet>
          <ThemeProvider theme={theme}>
            <Navbar
              siteTitle={`/${data.site.siteMetadata.title}`}
              onThemeChanged={onThemeChanged}
            />
            <Transition
              location={location}
              backgroundColor={theme.main.background}
            >
              <ContentWrapper>
                <Content>{children}</Content>
              </ContentWrapper>
            </Transition>
            <GlobalStyles />
          </ThemeProvider>
        </>
      )}
    />
  );
}

export default Layout;

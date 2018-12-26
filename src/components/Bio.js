import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const BioWrapper = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};
`;

const Avatar = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 60;
  border-radius: 100%;
`;

const BioText = styled.div`
  display: flex;
  flex-direction: column;
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <BioWrapper>
            <Avatar fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <BioText>
              <p style={{ marginBottom: 0 }}>
                Written by <strong>{author}</strong>.{` `}
              </p>
              <p>
                <a href={`https://twitter.com/${social.twitter}`}>
                  @awaveawave
                </a>
              </p>
            </BioText>
          </BioWrapper>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile_pic.jpg/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;

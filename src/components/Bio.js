import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import AnimatedGhost from '../components/AnimatedGhost';
import styled from 'styled-components';
import { rhythm } from '../utils/typography';

const BioWrapper = styled.div`
  display: flex;
`;

const Avatar = styled(Image)`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  min-width: 60;
  border-radius: 100%;
  box-shadow: 0px 0px 25px #0000004d;

  @media screen and (max-width: 310px) {
    display: none !important;
  }
`;

const BioText = styled.div`
  display: flex;
  flex-direction: column;
`;

function Bio(props) {
  const { simple } = props;
  let ghost;

  if (!simple) {
    ghost = <AnimatedGhost size={50} />;
  }

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
            {ghost}
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

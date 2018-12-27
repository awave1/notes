import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Post from '../components/Post';
import Bio from '../components/Bio';

const PostContainer = styled.div`
  margin-top: 45px;
`;

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <Post key={edge.node.id} post={edge.node} />);

  return (
    <>
      <Bio />
      <PostContainer>{Posts}</PostContainer>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

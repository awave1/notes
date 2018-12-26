import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import AnimatedIcon from '../components/animatedGhost';
import Layout from '../components/layout';
import Post from '../components/post';

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
    <Layout>
      <AnimatedIcon size={100} />
      <PostContainer>{Posts}</PostContainer>
    </Layout>
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
            path
            title
          }
        }
      }
    }
  }
`;

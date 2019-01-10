import React from 'react';
import { graphql } from 'gatsby';
import PostCard from '../components/PostCard';
import './css/index.css';

const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data;

  const content = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} post={edge.node} />);

  return <div style={{ marginTop: 45 }}>{content}</div>;
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
          fields {
            slug
            category
          }
        }
      }
    }
  }
`;

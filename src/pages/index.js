import React from 'react';
import { graphql } from 'gatsby';
import AnimatedIcon from '../components/animatedIcon';
import Layout from '../components/layout';
import PostLink from '../components/postLink';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout location={location}>
      <AnimatedIcon size={100} />
      <div>{Posts}</div>
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
          excerpt(pruneLength: 250)
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

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Card from '../components/Card';
import './css/index.css';

function IndexPage() {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query getAllPosts {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            html
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              published
            }
            fields {
              slug
              category
            }
          }
        }
      }
    }
  `);

  const content = edges
    .filter(
      edge => !!edge.node.frontmatter.date && edge.node.frontmatter.published
    )
    .map(edge => <Card key={edge.node.id} post={edge.node} />);

  return <div style={{ marginTop: 45 }}>{content}</div>;
}

export default IndexPage;

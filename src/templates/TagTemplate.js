import React from 'react';
import { Link, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import PostCard from '../components/PostCard';

const TagsTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with `;

  const content = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} post={edge.node} />);

  return (
    <div>
      <h3>
        {tagHeader} <span style={{ fontFamily: 'monospace' }}>"{tag}"</span>
      </h3>
      {content}
      <FontAwesomeIcon icon={faTags} /> <Link to="/tags">Show all tags</Link>
    </div>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            title
            date
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

export default TagsTemplate;

import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { leKebab } from '../utils/utils';

const Tag = styled.li`
  margin: 1rem 0;
  font-family: 'Hack', monospace;
`;

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <div>
      <Helmet title={title} />
      <div>
        <h3>Tags</h3>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {group.map(tag => (
            <Tag key={tag.fieldValue}>
              <Link to={`/tags/${leKebab(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </Tag>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsPage;

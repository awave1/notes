import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Bio from '../components/Bio';

const GITHUB_USER = 'awave1';
const GITHUB_REPO = 'notes';
const CONTENT_ROOT = 'content';

function Template(props) {
  const {
    markdownRemark: {
      frontmatter: { path, title, date },
      html,
    },
  } = props.data;
  const editUrl = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/edit/master/src/${CONTENT_ROOT}${path}.md`;

  return (
    <Layout>
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <a href={editUrl}>edit on github</a>
        <Bio simple />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default Template;

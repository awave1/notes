import React from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import 'katex/dist/katex.min.css';
import Bio from '../components/Bio';

const GITHUB_USER = 'awave1';
const GITHUB_REPO = 'notes';
const CONTENT_ROOT = 'content';

const EditContainer = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  background: none;
  color: black;
  font-family: monospace;
  margin: 1.5rem 0;
  transition: all 0.1s;
  font-weight: bold;

  &:hover {
    color: #1ca086;
  }
`;

const PagingContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 1.5rem 0;
`;

const PageLink = styled(Link)`
  text-decoration: none;
  background: none;
  color: black;
  font-family: monospace;
  &:hover {
    color: #1ca086;
  }
`;

const Page = props => (
  <li style={{ margin: 0 }}>
    <PageLink to={props.to}>{props.children}</PageLink>
  </li>
);

function Template(props) {
  const {
    markdownRemark: {
      frontmatter: { path, title, date },
      html,
    },
  } = props.data;
  const { prev, next } = props.pageContext;
  console.log(props.pageContext);
  const editUrl = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/edit/master/src/${CONTENT_ROOT}${path}.md`;

  return (
    <>
      <div className="blog-post">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <PagingContainer>
          {prev && <Page to={prev.fields.slug}> ￩ {prev.fields.slug}</Page>}
          {next && <Page to={next.fields.slug}>{next.fields.slug} ￫ </Page>}
        </PagingContainer>
        <EditContainer href={editUrl}>
          <FontAwesomeIcon icon={faGithub} />{' '}
          <span style={{ marginLeft: '10px' }}>editOnGithub();</span>
        </EditContainer>
        <Bio simple />
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;

export default Template;

import React from 'react';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import Bio from '../components/Bio';
import TagList from '../components/TagList';
import { getReadingTime } from '../utils/utils';

import 'katex/dist/katex.min.css';

const GITHUB_USER = 'awave1';
const GITHUB_REPO = 'notes';
const CONTENT_ROOT = 'content';

const BlogPost = styled.div`
  /* transition: all 150ms cubic-bezier(0.55, 0, 0.1, 1); */
`;

const EditContainer = styled.a`
  display: flex;
  align-items: center;
  font-family: monospace;
  margin: 1.5rem 0;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const PagingContainer = styled.ul`
  display: flex;
  list-style: none;
  margin: 1.5rem 0;
`;

const PageLink = styled(Link)`
  font-family: monospace;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 426px) {
    font-size: 13px;
  }
`;

const Page = props => {
  const css = {
    margin: `0 ${props.left ? 'auto' : '0'} 0 ${props.right ? 'auto' : '0'}`,
  };

  return (
    <li style={css}>
      <PageLink to={props.to}>{props.children}</PageLink>
    </li>
  );
};

const PostHeader = props => {
  const Container = styled.div`
    margin: 1rem 0;

    h1 {
      margin: 0;
    }
  `;

  return (
    <Container>
      <h1>{props.title}</h1>
      <small>
        {props.date} | {props.readingTime}
      </small>
      <TagList tags={props.tags} />
    </Container>
  );
};

function Template(props) {
  const {
    markdownRemark: {
      frontmatter: { title, date, tags },
      html,
    },
  } = props.data;
  const { slug, prev, next } = props.pageContext;

  const editUrl = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/edit/master/src/${CONTENT_ROOT}${slug}.md`;
  const readingTime = getReadingTime(html);

  return (
    <>
      <BlogPost>
        <PostHeader
          title={title}
          date={date}
          tags={tags}
          readingTime={readingTime}
        />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <PagingContainer>
          {prev && (
            <Page to={prev.fields.slug} left>
              {' '}
              ￩ {prev.fields.slug}
            </Page>
          )}
          {next && (
            <Page to={next.fields.slug} right>
              {next.fields.slug} ￫{' '}
            </Page>
          )}
        </PagingContainer>
        <EditContainer href={editUrl}>
          <FontAwesomeIcon icon={faGithub} />{' '}
          <span style={{ marginLeft: '10px' }}>editOnGithub();</span>
        </EditContainer>
        <Bio simple />
      </BlogPost>
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
        tags
      }
    }
  }
`;

export default Template;

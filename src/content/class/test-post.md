---
title: My first blog post
date: '2018-12-25'
path: '/class/test-post'
---

The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.

## Wow a cool heading right?

Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.

```jsx
import React from 'react';
import { graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import Layout from '../components/Layout';
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
  margin: 15px 0;
  transition: all 0.1s;

  &:hover {
    color: #1ca086;
  }
`;

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
        <EditContainer href={editUrl}>
          <FontAwesomeIcon icon={faGithub} />{' '}
          <span style={{ marginLeft: '10px' }}>editOnGithub();</span>
        </EditContainer>
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
```

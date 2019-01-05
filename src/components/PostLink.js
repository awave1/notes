import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.25rem;
`;

const PostContainer = styled.div`
  background: ${props => props.theme.card.background};
  box-shadow: 1px 0px 50px #0000001a;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 48px;
  transition: background 150ms cubic-bezier(0.55, 0, 0.1, 1);
`;

export default ({ post }) => {
  const {
    excerpt,
    fields: { slug },
    frontmatter: { title, date },
  } = post;

  return (
    <PostContainer>
      <PostTitle>
        <Link to={slug}>{title}</Link>
      </PostTitle>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </PostContainer>
  );
};
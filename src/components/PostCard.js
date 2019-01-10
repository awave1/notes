import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { getReadingTime } from '../utils/utils';

const PostTitle = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
`;

const PostContainer = styled.div`
  background: ${props => props.theme.card.background};
  box-shadow: 1px 0px 50px #0000001a;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 48px;
  transition: background 150ms cubic-bezier(0.55, 0, 0.1, 1);
`;

const PostCard = ({ post }) => {
  const {
    html,
    fields: { slug },
    frontmatter: { title, date, description },
  } = post;

  const readingTime = getReadingTime(html);

  return (
    <PostContainer>
      <PostTitle>
        <Link to={slug}>{title}</Link>
      </PostTitle>
      <small>
        {date} | {readingTime}
      </small>
      <p style={{ marginBottom: '0.5rem' }}>{description}</p>
    </PostContainer>
  );
};

export default PostCard;

import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { getReadingTime } from '../utils/utils';

const PostTitle = styled.h3`
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
`;

const PostContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  position: relative;
  color: ${props => props.theme.secondaryColor};
  background: ${props => props.theme.card.background};
  border: 1px solid;
  border-color: ${props => props.theme.card.borderColor};
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 48px;
  transition: all 150ms cubic-bezier(0.55, 0, 0.1, 1);

  &:hover {
    border-color: ${props => props.theme.card.hover.borderColor};
  }
`;

const CategoryLabel = styled.span`
  background: #df3131;
  position: absolute;
  color: white;
  right: 15px;
  font-size: 0.8rem;
  top: 0;
  padding: 3px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 15ch;
`;

const Card = ({ post }) => {
  const {
    html,
    fields: { slug, category },
    frontmatter: { title, date, description },
  } = post;

  const readingTime = getReadingTime(html);

  return (
    <PostContainer to={slug}>
      <CategoryLabel>{category}</CategoryLabel>
      <PostTitle>{title}</PostTitle>
      <small>
        {date} | {readingTime}
      </small>
      <p style={{ marginBottom: '0.5rem' }}>{description}</p>
    </PostContainer>
  );
};

export default Card;

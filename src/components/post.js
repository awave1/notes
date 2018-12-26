import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostTitle = styled.h3`
  margin-bottom: 5px;
`;

const PostContainer = styled.div`
  box-shadow: 1px 0px 50px #0000001a;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 48px;
`;

export default ({ post }) => {
  const {
    excerpt,
    frontmatter: { title, date, path },
  } = post;

  return (
    <PostContainer>
      <PostTitle>
        <Link to={path}>{title}</Link>
      </PostTitle>
      <small>{date}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </PostContainer>
  );
};

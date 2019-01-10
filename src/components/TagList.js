import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faTag } from '@fortawesome/free-solid-svg-icons';
import { leKebab } from '../utils/utils';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0 10px;
`;

const Tag = styled.li`
  margin: 0 5px;
  padding: 3px 10px;
  font-size: 0.9em;
  background: ${props => props.theme.tag.background};
  font-family: monospace;
  border-radius: 5px;
  transition: all 150ms cubic-bezier(0.55, 0, 0.1, 1);
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.tag.hover.background};
  }

  @media screen and (max-width: 600px) {
    margin: 5px 2px;
  }
`;

const TagList = ({ tags }) => {
  let icon;

  if (tags && tags.length > 0) {
    icon =
      tags.length > 1 ? (
        <FontAwesomeIcon icon={faTags} />
      ) : (
        <FontAwesomeIcon icon={faTag} />
      );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      {icon}
      <List>
        {tags.map((name, i) => (
          <Tag key={i}>
            <Link to={`/tags/${leKebab(name)}`}>{name}</Link>
          </Tag>
        ))}
      </List>
    </div>
  );
};

export default TagList;

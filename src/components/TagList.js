import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faTag } from '@fortawesome/free-solid-svg-icons';

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`;

const Tag = styled.li`
  margin: 0 5px;
  font-size: 0.9em;
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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {icon}
      <List>
        {tags.map((name, i) => (
          <Tag>
            <Link to="">{name}</Link>
            {i !== tags.length - 1 ? ',' : ''}
          </Tag>
        ))}
      </List>
    </div>
  );
};

export default TagList;

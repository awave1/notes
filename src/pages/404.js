import React from 'react';
import { Browser } from 'react-kawaii';
import styled from 'styled-components';

function NotFound() {
  const AwwBrowser = styled(Browser)`
    align-self: center;
  `;

  return (
    <>
      <AwwBrowser mood="ko" />
      <p style={{ alignSelf: 'center' }}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </>
  );
}

export default NotFound;

import React from 'react';
import { Browser } from 'react-kawaii';
import styled from 'styled-components';
import Layout from '../components/Layout';

function NotFound() {
  const AwwBrowser = styled(Browser)`
    align-self: center;
  `;

  return (
    <Layout>
      <AwwBrowser mood="ko" />
      <p style={{ alignSelf: 'center' }}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
    </Layout>
  );
}

export default NotFound;

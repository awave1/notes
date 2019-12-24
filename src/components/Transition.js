import React from 'react';
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';
import styled from '@emotion/styled';

const enter = 200;
const exit = 150;

const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `all ${enter}ms cubic-bezier(.55,0,.1,1)`,
    opacity: 1,
  },
  exiting: {
    transition: `all ${exit}ms cubic-bezier(.55,0,.1,1)`,
    opacity: 0,
  },
};

const TransitionWrapper = styled.div`
  background: ${props => props.theme.primaryColor};
`;

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <TransitionGroup>
        <ReactTransition key={location.pathname} timeout={{ enter, exit }}>
          {status => (
            <TransitionWrapper
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </TransitionWrapper>
          )}
        </ReactTransition>
      </TransitionGroup>
    );
  }
}

export default Transition;

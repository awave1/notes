import React from 'react';
import {
  TransitionGroup,
  Transition as ReactTransition,
} from 'react-transition-group';

const enter = 200;
const exit = 150;

const getTransitionStyles = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${enter}ms cubic-bezier(.55,0,.1,1)`,
    opacity: 1,
  },
  exiting: {
    transition: `all ${exit}ms cubic-bezier(.55,0,.1,1)`,
    opacity: 0,
  },
};

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props;

    return (
      <TransitionGroup>
        <ReactTransition key={location.pathname} timeout={{ enter, exit }}>
          {status => (
            <div style={{ ...getTransitionStyles[status] }}>{children}</div>
          )}
        </ReactTransition>
      </TransitionGroup>
    );
  }
}

export default Transition;

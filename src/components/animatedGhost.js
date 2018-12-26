import React from 'react';
import { Ghost } from 'react-kawaii';
import { styler, tween, merge, action, easing } from 'popmotion';

class AnimatedGhost extends React.Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
  }

  componentDidMount() {
    const body = styler(this.iconRef.current.querySelector('svg'));

    const leftEye = styler(
      this.iconRef.current.querySelector(
        '#kawaii-face__eyes__circle circle:first-child'
      )
    );

    const rightEye = styler(
      this.iconRef.current.querySelector(
        '#kawaii-face__eyes__circle circle:last-child'
      )
    );

    const showEye = tween({
      from: { scaleY: 0 },
      to: { scaleY: 1 },
      duration: 200,
    });

    const blinkEye = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0.3 },
      duration: 125,
      flip: 1,
    });

    const leftEyeAction = action(({ complete }) => {
      showEye.start({
        update: leftEye.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: leftEye.set }), 2000);
        },
      });
    });

    const rightEyeAction = action(({ complete }) => {
      showEye.start({
        update: rightEye.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: rightEye.set }), 2000);
        },
      });
    });

    tween({
      from: { y: 0 },
      to: { y: 20 },
      easings: easing.easeInOut,
      duration: 1650,
      yoyo: Infinity,
    }).start(body.set);

    merge(leftEyeAction, rightEyeAction).start();
  }

  render() {
    return (
      <div ref={this.iconRef} style={{ alignSelf: 'center' }}>
        <Ghost {...this.props} mood="happy" />
      </div>
    );
  }
}

export default AnimatedGhost;

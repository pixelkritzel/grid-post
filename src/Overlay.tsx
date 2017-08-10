import * as React from 'react';

import uiStore from './stores/ui';

export default class Overlay extends React.Component {
  closeOnEscape = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.closeOverlay();
    }
  };

  closeOverlay = () => {
    uiStore.OverlayContent = null;
  };

  componentDidMount() {
    document.body.addEventListener('keyup', this.closeOnEscape);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.closeOnEscape);
  }

  render() {
    return (
      <div className="overlay-background" onClick={this.closeOverlay}>
        <div className="overlay" onClick={event => event.stopPropagation()}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import ResourcesList from './Resources-List';
import ImageUploader from './Image-Uploader';
import Post from './Post';
import Overlay from './Overlay';

import uiStore from './stores/ui';

@observer
class App extends React.Component {
  render() {
    const appStyle = {
      filter: ''
    };
    if (uiStore.OverlayContent) {
      appStyle.filter = 'blur(20px) grayscale(20%)';
    }
    return (
      <div className="container-fluid">
        <div className="row" style={appStyle}>
          <div className="col">
            <Post />
          </div>
          <div className="col-4">
            <ImageUploader>
              <ResourcesList />
            </ImageUploader>
          </div>
        </div>
        {uiStore.OverlayContent
          ? <Overlay>
              <uiStore.OverlayContent />
            </Overlay>
          : null}
        <DevTools />
      </div>
    );
  }
}

export default App;

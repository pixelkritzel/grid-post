import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Edit from './Edit';
import ImageUploader from './Image-Uploader';
import Overlay from './Overlay';
import Post from './Post';
import ResourcesList from './Resources-List';

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
          <div className="col post-container">
            <Post />
          </div>
          <div className="col-4 sidebar">
            {uiStore.EditForm
              ? <Edit EditForm={uiStore.EditForm} />
              : <ImageUploader>
                  <ResourcesList />
                </ImageUploader>}
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

import * as React from 'react';

import uiStore from './stores/ui';

import ResourcesList from './Resources-List';
import ImageUploader from './Image-Uploader';
import Document from './Post';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col"
            onDragOver={event => event.preventDefault()}
            onDrop={event => console.log('drop', uiStore.draggedResource)}
          >
            <Document />
          </div>
          <div className="col-4">
            <ImageUploader>
              <ResourcesList />
            </ImageUploader>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

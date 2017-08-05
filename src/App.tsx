import * as React from 'react';
import DevTools from 'mobx-react-devtools';

import ResourcesList from './Resources-List';
import ImageUploader from './Image-Uploader';
import Post from './Post';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Post />
          </div>
          <div className="col-4">
            <ImageUploader>
              <ResourcesList />
            </ImageUploader>
          </div>
        </div>
        <DevTools />
      </div>
    );
  }
}

export default App;

import * as React from 'react';
import { Provider } from 'mobx-react';

import store from './stores';

import ResourcesList from './Resources-List';
import ImageUploader from './Image-Uploader';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col"
              onDragOver={event => event.preventDefault()}
              onDrop={event => console.log('drop', store.draggedResource)}
            >
              Here will be the layout!
            </div>
            <div className="col-4">
              <ImageUploader>
                <ResourcesList />
              </ImageUploader>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;

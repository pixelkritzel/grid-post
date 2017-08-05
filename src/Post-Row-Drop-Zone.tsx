import * as React from 'react';

import dataStore from './stores/data';

export default class PostRowDropZone extends React.Component {
  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const resourceCid = event.dataTransfer.getData('resource-cid');
    if (resourceCid) {
      dataStore.post.addRow(resourceCid);
    }
  };

  render() {
    return (
      <div onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
        Drop here
      </div>
    );
  }
}

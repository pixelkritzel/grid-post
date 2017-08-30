import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import appStore from './stores/app';

@observer
export default class PostRowDropZone extends React.Component {
  @observable isActive = false;

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    this.isActive = false;
    const resourceCid = event.dataTransfer.getData('resource-cid');
    if (resourceCid) {
      appStore.data.post.addRow(resourceCid);
    }
  };

  render() {
    const classNames = ['post-row-drop-zone'];
    if (this.isActive) {
      classNames.push('post-row-drop-zone--active');
    }
    return (
      <div
        className={classNames.join(' ')}
        onDragEnter={() => (this.isActive = true)}
        onDragLeave={() => (this.isActive = false)}
        onDragOver={event => event.preventDefault()}
        onDrop={this.onDrop}
      >
        Drop here
      </div>
    );
  }
}

import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowColumnModelType } from './stores/post-row';

interface PostRowColumnProps {
  key: number;
  column: PostRowColumnModelType;
  isDropAble: boolean;
}

@observer
export default class PostRow extends React.Component<PostRowColumnProps, {}> {
  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const { column, isDropAble } = this.props;
    if (!isDropAble) {
      return;
    }
    event.stopPropagation();
    const resourceCid = event.dataTransfer.getData('resource-cid');
    if (resourceCid) {
      column.addResource(resourceCid);
    }
  };
  render() {
    const { column } = this.props;
    return (
      <div className="col" onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
        {column.resources.map(resource => <img src={resource.dataUrl} className="img-fluid" alt={resource.fileName} />)}
      </div>
    );
  }
}

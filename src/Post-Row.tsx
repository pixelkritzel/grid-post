import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';

type PostRowProps = {
  key: number;
  postRow: PostRowModelType;
};

@observer
export default class PostRow extends React.Component<PostRowProps, {}> {
  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const resourceCid = event.dataTransfer.getData('resource-cid');
    const { postRow } = this.props;
    if (resourceCid) {
      postRow.addResource(resourceCid);
    }
  };
  render() {
    const { postRow } = this.props;
    return (
      <div className="row" onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
        {/* TODO: add key */}
        {postRow.resources.map(resource => {
          return (
            <div className="col">
              <img src={resource.dataUrl} className="img-fluid" alt={resource.fileName} />
            </div>
          );
        })}
      </div>
    );
  }
}

import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';

import PostRowColumn from './Post-Row-Column';

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
      postRow.addColumn(resourceCid);
    }
  };
  render() {
    const { postRow } = this.props;
    return (
      <div className="row" onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
        {/* TODO: add key */}
        {postRow.columns.map((column, index) =>
          <PostRowColumn key={index} column={column} isDropAble={postRow.columns.length === 2} />
        )}
      </div>
    );
  }
}

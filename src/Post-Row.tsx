import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';

import PostRowColumn from './Post-Row-Column';
import PostRowColumnWidthDragger from './Post-Row-Column-Width-Dragger';

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
      <div className="post-row" onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
        <div className="post-row__content">
          {/* TODO: add key */}
          {postRow.columns.map((column, index) =>
            <PostRowColumn key={index} column={column} isDropAble={postRow.columns.length === 2} />
          )}
          {postRow.columns.length > 1 ? <PostRowColumnWidthDragger postRow={postRow} /> : null}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import PostRowColumnHeightDragger from './Post-Row-Column-Height-Dragger';
import PostRowColumnContent from './Post-Row-Column-Content';

import appStore, { Mode } from './stores/app';

import { PostRowColumnModelType } from './stores/post-row-column';
import { PostRowContentModelType } from './stores/post-row-content';

interface PostRowColumnProps {
  column: PostRowColumnModelType;
}

@observer
export default class PostRowColumn extends React.Component<PostRowColumnProps, {}> {
  @observable dragCounter = 0;

  @computed
  get isDropTarget() {
    const { column } = this.props;
    return this.dragCounter !== 0 && column.isExtendable;
  }

  addResource = (resourceCid: string | undefined, position: number) => {
    const { column } = this.props;
    if (resourceCid) {
      column.addResource(resourceCid, position);
    }
  };

  incrementDragCounter = () => this.dragCounter++;

  decrementDragCounter = () => this.dragCounter--;

  render() {
    const { column } = this.props;
    const style = {
      flexBasis: column.width + '%'
    };
    return (
      <div style={style}>
        <div
          className="post-row-column"
          onDragOver={event => event.preventDefault()}
          onDragEnter={this.incrementDragCounter}
          onDragLeave={this.decrementDragCounter}
          onDrop={() => (this.dragCounter = 0)}
        >
          {column.contents.map((content: PostRowContentModelType) => (
            <PostRowColumnContent content={content} key={content.cid.toString()} />
          ))}
          {column.contents.length > 1 && appStore.mode === Mode.DEV ? (
            <PostRowColumnHeightDragger column={column} />
          ) : null}
          {this.isDropTarget ? (
            <div
              className="post-row-column__drop-top"
              onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 0)}
              title="Drop top"
            >
              +
            </div>
          ) : null}
          {this.isDropTarget ? (
            <div
              className="post-row-column__drop-bottom"
              onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 1)}
              title="Drop bottom"
            >
              +
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

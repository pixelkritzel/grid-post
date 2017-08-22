import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import PostRowColumnHeightDragger from './Post-Row-Column-Height-Dragger';
import { PostRowColumnModelType } from './stores/post-row';
import getImgSrc from './helpers/get-img-src';

interface PostRowColumnProps {
  key: number;
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
          {column.contents.map((content, index) => {
            const resourceStyle = {
              flexBasis: content.height + '%'
            };

            const backgroundImage = {
              marginTop: content.marginTop,
              marginRight: content.marginRight,
              marginBottom: content.marginBottom,
              marginLeft: content.marginLeft,
              height: `calc(100% - ${content.marginTop} - ${content.marginBottom})`,
              backgroundImage: `url(${getImgSrc(content.resource.cid.toString())})`
            };

            return (
              <div style={resourceStyle} key={index}>
                <div className="post-row-column__resource" style={backgroundImage}>
                  <img
                    src={getImgSrc(content.resource.cid.toString())}
                    className="img-fluid"
                    alt={content.resource.fileName}
                  />
                </div>
              </div>
            );
          })}
          {column.contents.length > 1 ? <PostRowColumnHeightDragger column={column} /> : null}
          {this.isDropTarget
            ? <div
                className="post-row-column__drop-top"
                onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 0)}
                title="Drop top"
              >
                +
              </div>
            : null}
          {this.isDropTarget
            ? <div
                className="post-row-column__drop-bottom"
                onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 1)}
                title="Drop bottom"
              >
                +
              </div>
            : null}
        </div>
      </div>
    );
  }
}

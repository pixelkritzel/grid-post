import * as React from 'react';
import { observer } from 'mobx-react';

import PostRowColumnHeightDragger from './Post-Row-Column-Height-Dragger';
import { PostRowColumnModelType } from './stores/post-row';
import getImgSrc from './helpers/get-img-src';

interface PostRowColumnProps {
  key: number;
  column: PostRowColumnModelType;
  isDropAble: boolean;
}

@observer
export default class PostRowColumn extends React.Component<PostRowColumnProps, {}> {
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
    const style = {
      flexBasis: column.width + '%'
    };
    return (
      <div style={style}>
        <div className="post-row-column" onDragOver={event => event.preventDefault()} onDrop={this.onDrop}>
          {column.contents.map(({ resource, height }, index) => {
            const resourceStyle = {
              backgroundImage: `url(${getImgSrc(resource.path)})`,
              flexBasis: height + '%'
            };

            return (
              <div className="post-row-column__resource" style={resourceStyle} key={index}>
                <img src={getImgSrc(resource.path)} className="img-fluid" alt={resource.fileName} />
              </div>
            );
          })}
          {column.contents.length > 1 ? <PostRowColumnHeightDragger column={column} /> : null}
        </div>
      </div>
    );
  }
}

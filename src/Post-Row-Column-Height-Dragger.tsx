import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowColumnModelType } from './stores/post-row';

import getAncestor from './helpers/get-ancestor';
import clamp from './helpers/clamp';

type PostRowColumnWidthDraggerPropsType = {
  column: PostRowColumnModelType;
};

@observer
export default class PostRowColumnHeightDragger extends React.Component<PostRowColumnWidthDraggerPropsType, {}> {
  domNode: HTMLDivElement;

  onMouseMove = (event: MouseEvent) => {
    const { column } = this.props;
    const columnElement = getAncestor(this.domNode, '.post-row-column');
    if (columnElement) {
      const mouseY = event.clientY - columnElement.getBoundingClientRect().top;
      const columnElementHeight = columnElement.clientHeight;
      const relativeMouseX = clamp(mouseY / columnElementHeight * 100, 0, 100);
      column.contents[0].setHeight(relativeMouseX);
    }
  };

  onMouseDown = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.onMouseMove);
    });
  };

  render() {
    const { column } = this.props;
    return (
      <div
        className="post-row-column-height-dragger"
        style={{ top: column.contents[0].height + '%' }}
        ref={elem => {
          if (elem) {
            this.domNode = elem;
          }
        }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}

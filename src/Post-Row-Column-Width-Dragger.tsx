import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';

import getAncestor from './helpers/get-ancestor';

function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num;
}

type PostRowColumnWidthDraggerPropsType = {
  postRow: PostRowModelType;
};

@observer
export default class PostRowColumnWidthDragger extends React.Component<PostRowColumnWidthDraggerPropsType, {}> {
  isDragged = false;
  domNode: HTMLDivElement;

  onMouseMove = (event: MouseEvent) => {
    const { postRow } = this.props;
    const postRowContent = getAncestor(this.domNode, '.post-row__content');
    if (postRowContent) {
      const mouseX = event.clientX - postRowContent.getBoundingClientRect().left;
      const postRowContentWidth = postRowContent.clientWidth;
      const relativeMouseX = clamp(mouseX / postRowContentWidth * 100, 0, 100);
      postRow.columns[0].setWidth(relativeMouseX);
    }
  };

  onMouseDown = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', this.onMouseMove);
    });
  };

  render() {
    const { postRow } = this.props;
    return (
      <div
        className="post-row-column-width-dragger"
        style={{ left: postRow.columns[0].width + '%' }}
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

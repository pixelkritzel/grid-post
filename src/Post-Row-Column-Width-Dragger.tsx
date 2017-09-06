import * as React from 'react';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';

import getAncestor from './helpers/get-ancestor';
import clamp from './helpers/clamp';

type PostRowColumnWidthDraggerPropsType = {
  postRow: PostRowModelType;
};

@observer
export default class PostRowColumnWidthDragger extends React.Component<PostRowColumnWidthDraggerPropsType, {}> {
  domNode: HTMLDivElement;

  onMouseMove = (event: MouseEvent) => {
    const { postRow } = this.props;
    const postRowContent = getAncestor(this.domNode, '.post-row__content');
    if (postRowContent) {
      const mouseX = event.clientX - postRowContent.getBoundingClientRect().left;
      const postRowContentWidth = postRowContent.clientWidth;
      const relativeMouseX = clamp(mouseX / postRowContentWidth * 100, 0, 100);
      postRow.setColumnsWidth(relativeMouseX);
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

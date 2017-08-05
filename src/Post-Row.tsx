import * as React from 'react';

import { PostRowModelType } from './stores/post-row';

type PostRowProps = {
  key: number;
  postRow: PostRowModelType;
};

export default class PostRow extends React.Component<PostRowProps, {}> {
  render() {
    const { postRow } = this.props;
    return (
      <div>
        <img src={postRow.resources[0].dataUrl} />
      </div>
    );
  }
}

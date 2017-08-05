import * as React from 'react';
import { observer } from 'mobx-react';

import dataStore from './stores/data';

import PostRow from './Post-Row';
import PostRowDropZone from './Post-Row-Drop-Zone';

@observer
export default class Document extends React.Component {
  render() {
    return (
      <div>
        <h3>Post</h3>
        {/* TODO: replace index by a cid */}
        {dataStore.post.rows.map((postRow, index) => <PostRow key={index} postRow={postRow} />)}
        <PostRowDropZone />
      </div>
    );
  }
}
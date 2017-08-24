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
        {dataStore.post.rows.map((postRow, index) =>
          <PostRow key={postRow.cid.toString()} postRow={postRow} index={index} />
        )}
        <PostRowDropZone />
      </div>
    );
  }
}

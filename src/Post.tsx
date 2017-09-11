import * as React from 'react';
import { observer } from 'mobx-react';

import appStore from './stores/app';
import { Mode } from './stores/ui';

import PostRow from './Post-Row';
import PostRowDropZone from './Post-Row-Drop-Zone';

@observer
export default class Document extends React.Component {
  render() {
    return (
      <div>
        <h3>Post</h3>
        {appStore.data.post.rows.map((postRow, index) => <PostRow key={index} postRow={postRow} index={index} />)}
        {appStore.ui.mode === Mode.DEV ? <PostRowDropZone /> : null}
      </div>
    );
  }
}

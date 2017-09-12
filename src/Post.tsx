import * as React from 'react';
import { observer } from 'mobx-react';

import appStore, { Mode } from './stores/app';

import PostRow from './Post-Row';
import PostRowDropZone from './Post-Row-Drop-Zone';

const style = `.post-row {
  width: 100%;
  position: relative;
  z-index: 10;
}

.post-row__content {
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.post-row-column {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-content: stretch;
  height: 100%;
}

.post-row-column__resource {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-row-column__resource img {
  visibility: hidden;
  height: 0;
  width: 0;
}
`;
@observer
export default class Document extends React.Component {
  render() {
    return (
      <div>
        <style>{style}</style>
        <h3>Post</h3>
        {appStore.data.post.rows.map((postRow, index) => <PostRow key={index} postRow={postRow} index={index} />)}
        {appStore.mode === Mode.DEV ? <PostRowDropZone /> : null}
      </div>
    );
  }
}

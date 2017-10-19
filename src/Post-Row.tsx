import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import appStore, { Mode } from './stores/app';

import PostRowColumn from './Post-Row-Column';
import PostRowColumnWidthDragger from './Post-Row-Column-Width-Dragger';
import InputGroup from './components/forms/Input-Group';
import FaClose from './icons/FaClose';
import FaPencil from './icons/FaPencil';

import { PostRowModelType } from './stores/post-row';
import { PostRowColumnModelType } from './stores/post-row-column';

type PostRowProps = {
  postRow: PostRowModelType;
  index: number;
};

@observer
export default class PostRow extends React.Component<PostRowProps, {}> {
  @observable dragCounter = 0;
  @computed
  get isDropTarget() {
    const { postRow } = this.props;
    return this.dragCounter !== 0 && postRow.isExtendable;
  }

  addColumn = (resourceCid: string | undefined, position: number) => {
    const { postRow } = this.props;
    if (resourceCid) {
      postRow.addColumn(resourceCid, position);
    }
  };

  renderEditForm = (postRow: PostRowModelType, index: number) => {
    appStore.ui.EditForm = () => {
      return (
        <div>
          <h3>Edit the {index + 1}. post row</h3>

          <div className="form-inline">
            <InputGroup
              identifier="post-row-margin-bottom"
              labelHtml="Margin Bottom Value"
              inputType="text"
              inputValue={postRow.marginBottom ? postRow.marginBottom.toString() : ''}
              onChange={event => postRow.setMarginBottom(event.target.value)}
              placeholder={`At the moment the resource uses the default margin-bottom of ${appStore.data.post
                .defaultStyles.rowMarginBottom}`}
            />
          </div>
          <div className="form-inline">
            <InputGroup
              identifier="post-row-width"
              labelHtml="Width"
              inputType="number"
              inputValue={postRow.width ? postRow.width.toString() : ''}
              onChange={event => postRow.setWidth(parseFloat(event.target.value))}
            />

            {' : '}
            <InputGroup
              identifier="post-row-height"
              labelHtml="Height"
              inputType="number"
              inputValue={postRow.height ? postRow.height.toString() : ''}
              onChange={event => postRow.setHeight(parseFloat(event.target.value))}
            />
          </div>
        </div>
      );
    };
  };

  incrementDragCounter = () => this.dragCounter++;

  decrementDragCounter = () => this.dragCounter--;

  render() {
    const { postRow, index: postRowIndex } = this.props;
    const postRowStyle = {
      marginBottom: postRow.marginBottom || appStore.data.post.defaultStyles.rowMarginBottom
    };
    const postRowRatio = {
      paddingTop:
        (postRow.height || appStore.data.post.defaultStyles.rowRatioHeight) /
          (postRow.width || appStore.data.post.defaultStyles.rowRatioWidth) *
          100 +
        '%'
    };
    return (
      <div
        className="post-row"
        style={postRowStyle}
        onDragOver={event => {
          event.preventDefault();
        }}
        onDragEnter={this.incrementDragCounter}
        onDragLeave={this.decrementDragCounter}
        onDrop={() => (this.dragCounter = 0)}
      >
        <div style={postRowRatio} />
        <div className="post-row__content">
          {postRow.columns.map((column: PostRowColumnModelType, index) => (
            <PostRowColumn key={index} column={column} />
          ))}
          {postRow.columns.length > 1 && appStore.mode === Mode.DEV ? (
            <PostRowColumnWidthDragger postRow={postRow} />
          ) : null}
        </div>
        {appStore.mode === Mode.DEV ? (
          <aside className="post-row__toolbar btn-group btn-group-vertical">
            <button
              type="button"
              title={``}
              className="btn btn-secondary"
              onClick={() => this.renderEditForm(postRow, postRowIndex)}
            >
              <FaPencil />
            </button>
            <button
              type="button"
              title={``}
              className="btn btn-danger"
              onClick={() => {
                appStore.ui.EditForm = null;
                postRow.remove();
              }}
            >
              <FaClose />
            </button>
          </aside>
        ) : null}
        {this.isDropTarget ? (
          <div
            className="post-row__drop-left"
            onDrop={event => this.addColumn(event.dataTransfer.getData('resource-cid'), 0)}
            title="Drop left"
          >
            +
          </div>
        ) : null}
        {this.isDropTarget ? (
          <div
            className="post-row__drop-right"
            onDrop={event => this.addColumn(event.dataTransfer.getData('resource-cid'), 1)}
            title="Drop right"
          >
            +
          </div>
        ) : null}
      </div>
    );
  }
}

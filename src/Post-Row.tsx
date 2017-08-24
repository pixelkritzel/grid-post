import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import uiStore from './stores/ui';

import PostRowColumn from './Post-Row-Column';
import PostRowColumnWidthDragger from './Post-Row-Column-Width-Dragger';
import InputGroup from './components/forms/Input-Group';
import FaClose from './icons/FaClose';
import FaPencil from './icons/FaPencil';

import { PostRowModelType, PostRowColumnModelType } from './stores/post-row';

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
    uiStore.EditForm = () => {
      return (
        <div>
          <h3>
            Edit the {index + 1}. post row
          </h3>

          <div className="form-inline">
            <InputGroup
              identifier="post-row-margin-bottom"
              labelHtml="Margin Bottom Value"
              inputType="number"
              inputValue={postRow.marginBottom.toString()}
              onChange={event => postRow.setMarginBottom(parseFloat(event.target.value))}
            />

            {' : '}

            <InputGroup
              identifier="post-row-margin-botto-unit"
              labelHtml=" Margin Bottom Unit"
              inputType="text"
              inputValue={postRow.marginBottomUnit}
              onChange={event => postRow.setMarginBottomUnit(event.target.value)}
            />
          </div>
          <div className="form-inline">
            <InputGroup
              identifier="post-row-width"
              labelHtml="Width"
              inputType="number"
              inputValue={postRow.width.toString()}
              onChange={event => postRow.setWidth(parseFloat(event.target.value))}
            />

            {' : '}
            <InputGroup
              identifier="post-row-height"
              labelHtml="Height"
              inputType="number"
              inputValue={postRow.height.toString()}
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
      marginBottom: postRow.marginBottom + postRow.marginBottomUnit
    };
    const postRowRatio = {
      paddingTop: postRow.height / postRow.width * 100 + '%'
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
          {/* TODO: add key */}
          {postRow.columns.map((column: PostRowColumnModelType, index: number) =>
            <PostRowColumn key={index} column={column} />
          )}
          {postRow.columns.length > 1 ? <PostRowColumnWidthDragger postRow={postRow} /> : null}
        </div>
        <aside className="post-row__toolbar btn-group btn-group-vertical">
          <button
            type="button"
            title={``}
            className="btn btn-secondary"
            onClick={() => this.renderEditForm(postRow, postRowIndex)}
          >
            <FaPencil />
          </button>
          <button type="button" title={``} className="btn btn-danger" onClick={() => postRow.destroy()}>
            <FaClose />
          </button>
        </aside>
        {this.isDropTarget
          ? <div
              className="post-row__drop-left"
              onDrop={event => this.addColumn(event.dataTransfer.getData('resource-cid'), 0)}
              title="Drop left"
            >
              +
            </div>
          : null}
        {this.isDropTarget
          ? <div
              className="post-row__drop-right"
              onDrop={event => this.addColumn(event.dataTransfer.getData('resource-cid'), 1)}
              title="Drop right"
            >
              +
            </div>
          : null}
      </div>
    );
  }
}

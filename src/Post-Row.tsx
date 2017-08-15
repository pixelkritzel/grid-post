import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { PostRowModelType } from './stores/post-row';
import uiStore from './stores/ui';

import FaPencil from './icons/FaPencil';
import PostRowColumn from './Post-Row-Column';
import PostRowColumnWidthDragger from './Post-Row-Column-Width-Dragger';

type PostRowProps = {
  key: number;
  postRow: PostRowModelType;
};

@observer
export default class PostRow extends React.Component<PostRowProps, {}> {
  @observable isHover = false;

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const resourceCid = event.dataTransfer.getData('resource-cid');
    const { postRow } = this.props;
    if (resourceCid) {
      postRow.addColumn(resourceCid);
    }
  };

  renderEditForm = (postRow: PostRowModelType) => {
    uiStore.EditForm = () => {
      return (
        <div>
          <div className="form-inline">
            <label htmlFor="post-row-margin-bottom" className="mr-sm-2">
              Margin Bottom Value
            </label>

            <input
              type="number"
              className="formControl mr-sm-2"
              id="post-row-margin-bottom"
              defaultValue={postRow.marginBottom.toString()}
              onChange={event => postRow.setMarginBottom(parseFloat(event.target.value))}
            />

            {' : '}
            <label htmlFor="post-row-margin-botto-unit" className="mr-sm-2">
              Margin Bottom Unit
            </label>

            <input
              type="text"
              className="formControl mr-sm-2"
              id="post-row-margin-botto-unit"
              defaultValue={postRow.marginBottomUnit}
              onChange={event => postRow.setMarginBottomUnit(event.target.value)}
            />
          </div>
          <div className="form-inline">
            <label htmlFor="post-row-width" className="mr-sm-2">
              Width
            </label>

            <input
              type="number"
              className="formControl mr-sm-2"
              id="post-row-width"
              defaultValue={postRow.width.toString()}
              onChange={event => postRow.setWidth(parseFloat(event.target.value))}
            />

            {' : '}
            <label htmlFor="post-row-height" className="mr-sm-2">
              Height
            </label>

            <input
              type="number"
              className="formControl mr-sm-2"
              id="post-row-height"
              defaultValue={postRow.height.toString()}
              onChange={event => postRow.setHeight(parseFloat(event.target.value))}
            />
          </div>
        </div>
      );
    };
  };

  render() {
    const { postRow } = this.props;
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
        onDragOver={event => event.preventDefault()}
        onDrop={this.onDrop}
        onMouseEnter={() => (this.isHover = true)}
        onMouseLeave={() => (this.isHover = false)}
      >
        <div style={postRowRatio} />
        <div className="post-row__content">
          {/* TODO: add key */}
          {postRow.columns.map((column, index) =>
            <PostRowColumn key={index} column={column} isDropAble={postRow.columns.length === 2} />
          )}
          {postRow.columns.length > 1 ? <PostRowColumnWidthDragger postRow={postRow} /> : null}
        </div>
        <aside className="post-row__toolbar btn-group">
          <button type="button" title={``} className="btn btn-secondary" onClick={() => this.renderEditForm(postRow)}>
            <FaPencil />
          </button>
        </aside>
      </div>
    );
  }
}

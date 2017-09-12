import * as React from 'react';
import { computed, observable } from 'mobx';
import { observer } from 'mobx-react';

import appStore, { Mode } from './stores/app';

import PostRowColumnHeightDragger from './Post-Row-Column-Height-Dragger';
import InputGroup from './components/forms/Input-Group';
import FaPencil from './icons/FaPencil';
import FaClose from './icons/FaClose';
import FaArrows from './icons/FaArrows';

import getImgSrc from './helpers/get-img-src';

import { PostRowColumnModelType } from './stores/post-row-column';
import { PostRowContentModelType } from './stores/post-row-content';

const renderEditForm = (content: PostRowContentModelType) =>
  (appStore.ui.EditForm = () => {
    return (
      <div>
        <h1>Edit picture</h1>
        <div className="form-inline">
          <InputGroup
            identifier="content-margin-top"
            labelHtml="Margin Top"
            inputType="text"
            inputValue={content.marginTop}
            onChange={event => content.setMargin('top', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-right"
            labelHtml="Margin Right"
            inputType="text"
            inputValue={content.marginRight}
            onChange={event => content.setMargin('right', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-bottom"
            labelHtml="Margin Bottom"
            inputType="text"
            inputValue={content.marginBottom}
            onChange={event => content.setMargin('bottom', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-left"
            labelHtml="Margin Left"
            inputType="text"
            inputValue={content.marginLeft}
            onChange={event => content.setMargin('left', event.target.value)}
          />
        </div>
      </div>
    );
  });

interface PostRowColumnProps {
  column: PostRowColumnModelType;
}

@observer
export default class PostRowColumn extends React.Component<PostRowColumnProps, {}> {
  @observable dragCounter = 0;

  @computed
  get isDropTarget() {
    const { column } = this.props;
    return this.dragCounter !== 0 && column.isExtendable;
  }

  addResource = (resourceCid: string | undefined, position: number) => {
    const { column } = this.props;
    if (resourceCid) {
      column.addResource(resourceCid, position);
    }
  };

  incrementDragCounter = () => this.dragCounter++;

  decrementDragCounter = () => this.dragCounter--;

  render() {
    const { column } = this.props;
    const style = {
      flexBasis: column.width + '%'
    };
    return (
      <div style={style}>
        <div
          className="post-row-column"
          onDragOver={event => event.preventDefault()}
          onDragEnter={this.incrementDragCounter}
          onDragLeave={this.decrementDragCounter}
          onDrop={() => (this.dragCounter = 0)}
        >
          {column.contents.map((content: PostRowContentModelType, index) => {
            const { cid } = content;
            const resourceStyle = {
              flexBasis: content.height + '%'
            };

            const backgroundImage = {
              marginTop: content.marginTop,
              marginRight: content.marginRight,
              marginBottom: content.marginBottom,
              marginLeft: content.marginLeft,
              height: `calc(100% - ${content.marginTop} - ${content.marginBottom})`,
              backgroundImage: `url(${getImgSrc(content.resource)})`
            };

            return (
              <div style={resourceStyle} key={cid.toString()}>
                <div className="post-row-column__resource" style={backgroundImage}>
                  <img src={getImgSrc(content.resource)} className="img-fluid" alt={content.resource.fileName} />
                  {appStore.mode === Mode.DEV ? (
                    <aside className="post-row-column__resource__toolbar btn-group">
                      <button type="button" title={``} className="btn btn-secondary" onClick={console.log}>
                        <FaArrows />
                      </button>
                      <button
                        type="button"
                        title={`Edit picture`}
                        className="btn btn-secondary"
                        onClick={() => renderEditForm(content)}
                      >
                        <FaPencil />
                      </button>
                      <button
                        type="button"
                        title={``}
                        className="btn btn-danger"
                        onClick={() => {
                          appStore.ui.EditForm = null;
                          content.remove();
                        }}
                      >
                        <FaClose />
                      </button>
                    </aside>
                  ) : null}
                </div>
              </div>
            );
          })}
          {column.contents.length > 1 && appStore.mode === Mode.DEV ? (
            <PostRowColumnHeightDragger column={column} />
          ) : null}
          {this.isDropTarget ? (
            <div
              className="post-row-column__drop-top"
              onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 0)}
              title="Drop top"
            >
              +
            </div>
          ) : null}
          {this.isDropTarget ? (
            <div
              className="post-row-column__drop-bottom"
              onDrop={event => this.addResource(event.dataTransfer.getData('resource-cid'), 1)}
              title="Drop bottom"
            >
              +
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

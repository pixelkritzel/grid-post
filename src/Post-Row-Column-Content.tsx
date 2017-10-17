import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import FaArrows from './icons/FaArrows';
import FaClose from './icons/FaClose';
import FaPencil from './icons/FaPencil';
import FaRefresh from './icons/FaRefresh';
import renderEditForm from './components/renderEditForm';

import appStore, { Mode } from './stores/app';
import getImgSrc from './helpers/get-img-src';

import { PostRowContentModelType } from './stores/post-row-content';

interface PostRowColumnContentProps {
  content: PostRowContentModelType;
}

export class PostRowColumnContent extends React.Component<PostRowColumnContentProps, {}> {
  @observable dragCounter = 0;
  incrementDragCounter = () => this.dragCounter++;
  decrementDragCounter = () => this.dragCounter--;

  switchResource = ({ contentCid, resourceCid }: { contentCid: string; resourceCid: string }) => {
    const { content: currentContent } = this.props;
    if (resourceCid) {
      const newResource = appStore.data.resources.find(testedResource => testedResource.cid.toString() === resourceCid);
      currentContent.switchResource(newResource);
    }
  };

  render() {
    const { content } = this.props;
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
      <div
        style={resourceStyle}
        key={cid.toString()}
        onDragOver={event => event.preventDefault()}
        onDragEnter={this.incrementDragCounter}
        onDragLeave={this.decrementDragCounter}
        onDrop={() => (this.dragCounter = 0)}
      >
        <div className="post-row-column__resource" style={backgroundImage}>
          <img src={getImgSrc(content.resource)} className="img-fluid" alt={content.resource.fileName} />
          {appStore.mode === Mode.DEV ? (
            <div>
              <aside className="post-row-column__resource__toolbar btn-group">
                <div
                  className="btn btn-secondary"
                  draggable={true}
                  onDragStart={event => event.dataTransfer.setData('content-cid', content.cid.toString())}
                >
                  <FaArrows />
                </div>
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
              {this.dragCounter !== 0 && (
                <aside>
                  <div
                    className="btn btn-secondary"
                    onDrop={event =>
                      this.switchResource({
                        resourceCid: event.dataTransfer.getData('resource-cid'),
                        contentCid: event.dataTransfer.getData('content-cid')
                      })}
                  >
                    <FaRefresh />
                  </div>
                </aside>
              )}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default observer(PostRowColumnContent);

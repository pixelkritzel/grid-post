import * as React from 'react';
import { observer } from 'mobx-react';

import appStore from './stores/app';

import FaTrash from './icons/FaTrash';
import FaPencil from './icons/FaPencil';

import getImgSrc from './helpers/get-img-src';

import { IResourceModelType } from './stores/resource-model';
interface ResourceTypeImageProps {
  resource: IResourceModelType;
}

@observer
export default class ResourceTypeImage extends React.Component<ResourceTypeImageProps, {}> {
  removeImage = (resource: IResourceModelType) => {
    const { data: dataStore, ui: uiStore } = appStore;
    uiStore.OverlayContent = () => {
      return (
        <div>
          <div className="modal-header">
            <h5 className="modal-title">Removing image</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => (uiStore.OverlayContent = null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to remove the image {resource.fileName} from the resources?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                dataStore.removeResource(resource);
                uiStore.OverlayContent = null;
              }}
            >
              Yes
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => (uiStore.OverlayContent = null)}>
              No
            </button>
          </div>
        </div>
      );
    };
  };

  render() {
    const { resource } = this.props;
    const { cid, fileName } = resource;
    if (appStore.syncedResources.includes(cid.toString())) {
      return (
        <div className="resource-type-image">
          <aside className="resource-type-image__toolbar btn-group">
            <button
              type="button"
              title={
                resource.isUsed ? (
                  `Can't remove picture ${fileName}, because it's used in the post`
                ) : (
                  `Remove picture ${fileName} from project`
                )
              }
              className="btn btn-secondary"
              disabled={resource.isUsed}
              onClick={() => this.removeImage(resource)}
            >
              <FaTrash />
            </button>
            <button type="button" title={`Edit picture data for ${fileName}`} className="btn btn-secondary">
              <FaPencil />
            </button>
          </aside>
          <img src={getImgSrc(cid.toString())} className="img-fluid" alt={fileName} />
        </div>
      );
    } else {
      return null;
    }
  }
}

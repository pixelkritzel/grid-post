import * as React from 'react';
import { IResourceModelType } from './stores/resource-model';
import uiStore from './stores/ui';
import dataStore from './stores/data';
import getImgSrc from './helpers/get-img-src';

import FaTrash from './icons/FaTrash';
import FaPencil from './icons/FaPencil';

interface ResourceTypeImageProps {
  resource: IResourceModelType;
}

export default class ResourceTypeImage extends React.Component<ResourceTypeImageProps, {}> {
  removeImage = (resource: IResourceModelType) => {
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
            <p>
              Are you sure you want to remove the image {resource.fileName} from the resources?
            </p>
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
    const { cid, fileName, isSynced } = resource;
    if (isSynced) {
      return (
        <div className="resource-type-image">
          <aside className="resource-type-image__toolbar btn-group">
            <button
              type="button"
              title={`Remove picture ${fileName} from project`}
              className="btn btn-secondary"
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

import * as React from 'react';
import { ResourceImageType } from './stores/resource-model';
import getImgSrc from './helpers/get-img-src';

import FaTrash from './icons/FaTrash';
import FaPencil from './icons/FaPencil';

interface ResourceTypeImageProps {
  resource: ResourceImageType;
}

export default class ResourceTypeImage extends React.Component<ResourceTypeImageProps, {}> {
  removeImage = () => {};

  render() {
    const { path, fileName } = this.props.resource;
    return (
      <div className="resource-type-image">
        <aside className="resource-type-image__toolbar btn-group">
          <button
            type="button"
            title={`Remove picture ${fileName} from project`}
            className="btn btn-secondary"
            onClick={this.removeImage}
          >
            <FaTrash />
          </button>
          <button type="button" title={`Edit picture data for ${fileName}`} className="btn btn-secondary">
            <FaPencil />
          </button>
        </aside>
        <img src={getImgSrc(path)} className="img-fluid" alt={fileName} />
      </div>
    );
  }
}

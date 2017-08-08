import * as React from 'react';
import { ResourceImageType } from './stores/resource-model';
import getImgSrc from './helpers/get-img-src';

interface ResourceTypeImageProps {
  resource: ResourceImageType;
}

export default class ResourceTypeImage extends React.Component<ResourceTypeImageProps, {}> {
  render() {
    const { path, fileName } = this.props.resource;
    return <img src={getImgSrc(path)} className="img-fluid" alt={fileName} />;
  }
}

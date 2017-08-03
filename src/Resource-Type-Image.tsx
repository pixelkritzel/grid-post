import * as React from 'react';
import { ResourceImageType } from './stores/resource-model';

interface ResourceTypeImageProps {
  resource: ResourceImageType;
}

export default class ResourceTypeImage extends React.Component<ResourceTypeImageProps, {}> {
  render() {
    console.log(this.props.resource);
    const { dataUrl } = this.props.resource;
    return <img src={dataUrl} />;
  }
}

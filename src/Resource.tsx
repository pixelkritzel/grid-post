import * as React from 'react';
import { observer } from 'mobx-react';

import { IResourceModelType } from './stores/resource-model';

import ResourceTypeText from './Resource-Type-Text';
import ResourceTypeImage from './Resource-Type-Image';

export interface ResourceProps {
  resource: IResourceModelType;
}

@observer
class Resource extends React.Component<ResourceProps, {}> {
  render() {
    const { resource } = this.props;
    let ResourceComponent;
    if (resource.type === 'text') {
      ResourceComponent = ResourceTypeText;
    } else if (resource.type === 'image') {
      ResourceComponent = ResourceTypeImage;
    }
    return (
      <div draggable={true} onDragStart={event => event.dataTransfer.setData('resource-cid', resource.cid.toString())}>
        {typeof ResourceComponent !== 'undefined' ? <ResourceComponent resource={resource} /> : null}
      </div>
    );
  }
}

export default Resource;

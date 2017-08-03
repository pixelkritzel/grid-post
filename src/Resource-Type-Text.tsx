import * as React from 'react';

import { ResourceTextType } from './stores/resource-model';

export interface ResourceTypeTextProps {
  resource: ResourceTextType;
}

export default class ResourceTypeText extends React.Component<ResourceTypeTextProps, {}> {
  render() {
    return <blockquote>Insert Text Node</blockquote>;
  }
}

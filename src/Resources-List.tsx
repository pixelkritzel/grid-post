import * as React from 'react';
import { observer } from 'mobx-react';

import appStore from './stores/app';

import Resource from './Resource';

import { IResourceModelType } from './stores/resource-model';

class ResourcesList extends React.Component {
  render() {
    return (
      <ul className="list-unstyled">
        {appStore.data.resources.map((resource: IResourceModelType) => {
          return (
            <li key={resource.cid.toString()}>
              <Resource resource={resource} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default observer(ResourcesList);

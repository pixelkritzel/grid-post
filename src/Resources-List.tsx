import * as React from 'react';
import { observer } from 'mobx-react';

import dataStore from './stores/data';

import Resource from './Resource';

class ResourcesList extends React.Component {
  render() {
    return (
      <ul className="list-unstyled">
        {dataStore.resources.map((resource, index) => {
          return (
            <li key={index}>
              <Resource resource={resource} />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default observer(ResourcesList);

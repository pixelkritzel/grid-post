import { types } from 'mobx-state-tree';

import resourceModel from './resource-model';
import dataStore from './data';

export const PostRowModel = types.model(
  {
    resources: types.array(types.reference(resourceModel))
  },
  {
    addResource(droppedResourceCid: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.resources.push(droppedResource);
      }
    }
  }
);

export type PostRowModelType = typeof PostRowModel.Type;

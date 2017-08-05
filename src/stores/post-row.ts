import { types } from 'mobx-state-tree';

import resourceModel from './resource-model';
import dataStore from './data';

export const PostRowColumnModel = types.model(
  'PostRowColumnModel',
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

export type PostRowColumnModelType = typeof PostRowColumnModel.Type;

export const PostRowModel = types.model(
  'PostRowModel',
  {
    columns: types.array(PostRowColumnModel)
  },
  {
    addColumn(droppedResourceCid: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.columns.push(
          PostRowColumnModel.create({
            resources: [droppedResource]
          })
        );
      }
    }
  }
);

export type PostRowModelType = typeof PostRowModel.Type;

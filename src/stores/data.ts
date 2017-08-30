import { types } from 'mobx-state-tree';

import getId from '../helpers/get-id';
import ResourceModel, { ResourceType, IResourceModelType } from './resource-model';
import PostModel from './post';

export const emptyDataStore = {
  resources: [
    {
      cid: getId('resource'),
      type: 'text'
    }
  ],
  post: {
    cid: getId('post'),
    rows: []
  }
};

export const DataStoreModel = types.model(
  'DataStore',
  {
    resources: types.array(ResourceModel),
    post: PostModel
  },
  {
    addResource(resource: ResourceType) {
      this.resources.push(ResourceModel.create({ cid: getId('resource'), ...resource }));
    },
    removeResource(resource: IResourceModelType) {
      if (this.post.resourceIsUsed(resource)) {
        throw new Error("Can't remove resource because it's used in the post");
      }
      const indexOfResource = this.resources.indexOf(resource);
      if (indexOfResource > -1) {
        this.resources.splice(indexOfResource, 1);
      }
    }
  }
);

// onPatch(dataStore, () => {
//   const stringifiedStore = JSON.stringify(dataStore);
//   localStorage.setItem('latest', stringifiedStore);
// });

export type DataStoreType = typeof DataStoreModel.Type;

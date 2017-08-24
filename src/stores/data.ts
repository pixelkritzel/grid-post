import { onAction, types } from 'mobx-state-tree';

import getId from '../helpers/get-id';
import ResourceModel, { ResourceType, IResourceModelType } from './resource-model';
import post, { PostModel } from './post';

export const DataStoreModel = types.model(
  'DataStore',
  {
    resources: types.array(ResourceModel),
    post: types.reference(PostModel)
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

const dataStore = DataStoreModel.create({
  resources: [
    ResourceModel.create({
      cid: getId('resource'),
      type: 'text'
    })
  ],
  post: post
});

export type DataStoreType = typeof DataStoreModel.Type;

const electron = window['require']('electron');
onAction(dataStore, () => {
  const syncedResourcesIds = JSON.parse(
    electron.ipcRenderer.sendSync('resources', JSON.stringify(dataStore.resources))
  );
  syncedResourcesIds.forEach((syncedResourceId: string) => {
    const syncedResource = dataStore.resources.find(resource => resource.cid === syncedResourceId);
    if (syncedResource) {
      syncedResource.isSynced = true;
    }
  });
});

export default dataStore;

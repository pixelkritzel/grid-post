import { onPatch, types } from 'mobx-state-tree';

import getId from '../helpers/get-id';
import ResourceModel, { ResourceType, IResourceModelType } from './resource-model';
import PostModel from './post';

const emptyDataStore = {
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

const latestSaveAsString = localStorage.getItem('latest');
let latestSave;
if (typeof latestSaveAsString === 'string') {
  latestSave = JSON.parse(latestSaveAsString);
}

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

const dataStore = DataStoreModel.create(latestSave || emptyDataStore);

const electron = window['require']('electron');

function sendResourcesToServer() {
  const syncedResourcesIds = JSON.parse(
    electron.ipcRenderer.sendSync('resources', JSON.stringify(dataStore.resources))
  );
  syncedResourcesIds.forEach((syncedResourceId: string) => {
    const syncedResource = dataStore.resources.find(resource => resource.cid === syncedResourceId);
    if (syncedResource) {
      syncedResource.setIsSynced(true);
    }
  });
}

onPatch(dataStore, sendResourcesToServer);
sendResourcesToServer();

onPatch(dataStore, () => {
  const stringifiedStore = JSON.stringify(dataStore);
  localStorage.setItem('latest', stringifiedStore);
});

export type DataStoreType = typeof DataStoreModel.Type;
export default dataStore;

function saveStore(savePath: string) {
  electron.ipcRenderer.send(
    'save-store',
    JSON.stringify({
      savePath,
      content: dataStore
    })
  );
}

export { saveStore };

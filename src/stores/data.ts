import { types, onAction } from 'mobx-state-tree';

import getId from '../helpers/getId';
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

onAction(dataStore, console.log);

export default dataStore;

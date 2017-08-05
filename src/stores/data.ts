import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';
import ResourceModel, { ResourceType } from './resource-model';
import post, { PostModel } from './post';

export const DataStoreModel = types.model(
  {
    resources: types.array(ResourceModel),
    post: types.reference(PostModel)
  },
  {
    addResource(resource: ResourceType) {
      this.resources.push(ResourceModel.create({ cid: getId('resource'), ...resource }));
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

export default dataStore;

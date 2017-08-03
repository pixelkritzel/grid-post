import { types } from 'mobx-state-tree';

import resourceModel, { ResourceType } from './resource-model';

export const StoreModel = types.model(
  {
    resources: types.array(resourceModel)
  },
  {
    addImage(image: ResourceType) {
      this.resources.push(image);
    }
  }
);

const store = StoreModel.create({
  resources: [
    {
      type: 'text'
    }
  ]
});

export default store;

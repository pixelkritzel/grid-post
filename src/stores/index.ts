import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';
import ResourceModel, { ResourceType, IResourceModelType } from './resource-model';

export const StoreModel = types.model(
  {
    resources: types.array(ResourceModel),
    draggedResource: types.maybe(types.reference(ResourceModel))
  },
  {
    addResource(resource: ResourceType) {
      this.resources.push(ResourceModel.create({ cid: getId('resource'), ...resource }));
    },
    setDraggedResource(resource: IResourceModelType) {
      this.draggedResource = resource;
    }
  }
);

const store = StoreModel.create({
  resources: [
    ResourceModel.create({
      cid: getId('resource'),
      type: 'text'
    })
  ]
});

export default store;

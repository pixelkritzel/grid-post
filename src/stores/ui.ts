import { types } from 'mobx-state-tree';

import ResourceModel, { IResourceModelType } from './resource-model';

const UiStoreModel = types.model(
  {
    draggedResource: types.maybe(types.reference(ResourceModel))
  },
  {
    setDraggedResource(resource: IResourceModelType) {
      this.draggedResource = resource;
    }
  }
);

const uiStore = UiStoreModel.create();

export default uiStore;

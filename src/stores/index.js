import { types } from 'mobx-state-tree';

import imageModel from './image-model';

export const StoreModel = types.model(
  {
    images: types.array(imageModel)
  },
  {
    addImage(image) {
      this.images.push(image);
    }
  }
);

const store = StoreModel.create({
  images: []
});

export default store;

import { types } from 'mobx-state-tree';

import resourceModel from './resource-model';

export const PostRowModel = types.model({
  resources: types.array(types.reference(resourceModel))
});

export type PostRowModelType = typeof PostRowModel.Type;

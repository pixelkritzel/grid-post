import { types } from 'mobx-state-tree';

import resourceModel from './resource-model';

export const postRowModel = types.model({
  resources: types.array(resourceModel)
});

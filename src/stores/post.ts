import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';

import dataStore from './data';
import { PostRowModel } from './post-row';

export const PostModel = types.model(
  {
    cid: types.identifier(),
    rows: types.array(PostRowModel)
  },
  {
    addRow(droppedResourceId: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid.toString() === droppedResourceId);
      const row = PostRowModel.create({
        resources: [droppedResource]
      });
      this.rows.push(row);
    }
  }
);

const post = PostModel.create({
  cid: getId('post'),
  rows: []
});

export default post;

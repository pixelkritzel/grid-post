import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';

import dataStore from './data';
import { PostRowModel, PostRowColumnModel } from './post-row';

export const PostModel = types.model(
  'Post',
  {
    cid: types.identifier(),
    rows: types.array(PostRowModel)
  },
  {
    addRow(droppedResourceId: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid.toString() === droppedResourceId);
      if (droppedResource) {
        const row = PostRowModel.create({
          columns: [
            PostRowColumnModel.create({
              resources: [droppedResource]
            })
          ]
        });
        this.rows.push(row);
      }
    }
  }
);

const post = PostModel.create({
  cid: getId('post'),
  rows: []
});

export default post;

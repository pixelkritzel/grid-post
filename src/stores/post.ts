import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';

import { PostRowModel, PostRowColumnModel } from './post-row';

export const PostModel = types.model(
  'Post',
  {
    cid: types.identifier(),
    rows: types.array(PostRowModel)
  },
  {
    addRow(droppedResourceId: string) {
      const newPostRowColumn = PostRowColumnModel.create({
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceId);
      const row = PostRowModel.create({
        columns: [newPostRowColumn]
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

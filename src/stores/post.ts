import { types } from 'mobx-state-tree';

import getId from '../helpers/get-id';

import { PostRowModel, PostRowColumnModel } from './post-row';
import { IResourceModelType } from './resource-model';

export const PostModel = types.model(
  'Post',
  {
    cid: types.identifier(),
    rows: types.array(PostRowModel),
    resourceIsUsed(resource: IResourceModelType) {
      const resourceCounter = this.rows.reduce((prev, row) => {
        return row.columns.reduce((prev, column) => {
          return column.contents.reduce((prev, content) => (content.resource === resource ? ++prev : prev), prev);
        }, prev);
      }, 0);
      return resourceCounter !== 0;
    }
  },
  {
    addRow(droppedResourceId: string) {
      const newPostRowColumn = PostRowColumnModel.create({
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceId, 0);
      const row = PostRowModel.create({
        columns: [newPostRowColumn],
        cid: getId('post-row')
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

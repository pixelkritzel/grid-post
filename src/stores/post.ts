import { types } from 'mobx-state-tree';
import getId from '../helpers/get-id';
import { PostRowModel } from './post-row';
import { PostRowColumnModel } from './post-row-column';
import { IResourceModelType } from './resource-model';
const PostModel = types
  .model('Post', {
    cid: types.identifier(),
    rows: types.array(PostRowModel)
  })
  .views(self => ({
    resourceIsUsed(resource: IResourceModelType) {
      const resourceCounter = self.rows.reduce((prev, row) => {
        return row.columns.reduce((prev, column) => {
          return column.contents.reduce((prev, content) => (content.resource === resource ? ++prev : prev), prev);
        }, prev);
      }, 0);
      return resourceCounter !== 0;
    }
  }))
  .actions(self => {
    function addRow(droppedResourceId: string) {
      const newPostRowColumn = PostRowColumnModel.create({
        cid: getId('post-row'),
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceId, 0);
      const row = PostRowModel.create({
        columns: [newPostRowColumn]
      });
      self.rows.push(row);
    }
    function removePostRow(indexOfPostRow: number) {
      self.rows.splice(indexOfPostRow, 1);
    }
    return {
      addRow,
      removePostRow
    };
  });

export default PostModel;

export type PostModelType = typeof PostModel.Type;

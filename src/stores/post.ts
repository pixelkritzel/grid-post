import { types } from 'mobx-state-tree';

import { PostRowModel } from './post-row';
import { PostRowColumnModel } from './post-row-column';
import { IResourceModelType } from './resource-model';

export default types.model(
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
        columns: [newPostRowColumn]
      });
      this.rows.push(row);
    }
  }
);

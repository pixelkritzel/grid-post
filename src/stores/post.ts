import { types } from 'mobx-state-tree';
import getId from '../helpers/get-id';
import { PostRowModel } from './post-row';
import { PostRowColumnModel } from './post-row-column';
import { PostRowContentModelType } from './post-row-content';
import { IResourceModelType } from './resource-model';

const PostModel = types
  .model('Post', {
    cid: types.identifier(),
    rows: types.array(PostRowModel),
    defaultStyles: types.model({
      rowMarginBottom: '8px',
      rowRatioWidth: 16,
      rowRatioHeight: 9
    })
  })
  .views(self => ({
    get allImagePaths(): string[] {
      const imagePaths: string[] = [];
      self.rows.forEach(row =>
        row.columns.forEach(column =>
          column.contents.forEach(content => {
            if (!imagePaths.includes(content.resource.path)) {
              imagePaths.push(content.resource.path);
            }
          })
        )
      );
      return imagePaths;
    },
    getContentModel(contentCid: string): PostRowContentModelType | undefined {
      let content: PostRowContentModelType | undefined;
      allTheLoops: for (let rowIndex = 0; rowIndex < self.rows.length; rowIndex++) {
        for (let columnsIndex = 0; columnsIndex < self.rows[rowIndex].columns.length; columnsIndex++) {
          for (
            let contentsIndex = 0;
            contentsIndex < self.rows[rowIndex].columns[columnsIndex].contents.length;
            contentsIndex++
          ) {
            const currentContent = self.rows[rowIndex].columns[columnsIndex].contents[contentsIndex];
            if (currentContent.cid.toString() === contentCid) {
              content = currentContent;
              break allTheLoops;
            }
          }
        }
      }
      return content;
    },
    resourceIsUsed(resource: IResourceModelType) {
      /* tslint:disable:no-shadowed-variable */
      const resourceCounter = self.rows.reduce((prev, row) => {
        return row.columns.reduce((prev, column) => {
          return column.contents.reduce((prev, content) => (content.resource === resource ? ++prev : prev), prev);
        }, prev);
      }, 0);
      /* ts-lint:enable */
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

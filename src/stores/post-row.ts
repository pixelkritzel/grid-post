import { types, getParent } from 'mobx-state-tree';
import { PostRowColumnModel } from './post-row-column';
import { PostModelType } from './post';
import getId from '../helpers/get-id';
export const PostRowModel = types
  .model('PostRowModel', {
    columns: types.array(PostRowColumnModel),
    width: 16,
    height: 9,
    marginBottom: 8,
    marginBottomUnit: 'px'
  })
  .views(self => ({
    get isExtendable() {
      return self.columns.length < 2;
    }
  }))
  .actions(self => {
    function addColumn(droppedResourceCid: string, position: number) {
      const newPostRowColumn = PostRowColumnModel.create({
        cid: getId('post-row-column'),
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceCid, 0);
      self.columns.splice(position, 0, newPostRowColumn);
      if (self.columns.length === 2) {
        self.columns[0].width = 50;
        self.columns[1].width = 50;
      }
    }
    function remove() {
      const post: PostModelType = getParent(self, 2);
      const postRows: (typeof self)[] = post.rows;
      if (postRows) {
        const indexOfThisPostRow = postRows.indexOf(self);
        post.removePostRow(indexOfThisPostRow);
      }
    }
    function removeColumn(indexOfColumn: number) {
      self.columns.splice(indexOfColumn, 1);
      if (self.columns.length === 0) {
        remove();
      } else if (self.columns.length === 1) {
        setColumnsWidth(100);
      }
    }
    function setColumnsWidth(width: number) {
      const { columns } = self;
      columns[0].width = width;
      if (columns.length > 1) {
        const otherColumnsWidth = 100 - width;
        columns[1].width = otherColumnsWidth;
      }
    }
    function setWidth(width: number) {
      self.width = width;
    }
    function setHeight(height: number) {
      self.height = height;
    }
    function setMarginBottom(marginBottom: number) {
      self.marginBottom = marginBottom;
    }
    function setMarginBottomUnit(unit: string) {
      self.marginBottomUnit = unit;
    }
    return {
      addColumn,
      remove,
      removeColumn,
      setColumnsWidth,
      setWidth,
      setHeight,
      setMarginBottom,
      setMarginBottomUnit
    };
  });
export type PostRowModelType = typeof PostRowModel.Type;

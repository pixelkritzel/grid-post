import { types, getParent } from 'mobx-state-tree';

import { PostRowColumnModel } from './post-row-column';

export const PostRowModel = types.model(
  'PostRowModel',
  {
    columns: types.array(PostRowColumnModel),
    width: 16,
    height: 9,
    marginBottom: 8,
    marginBottomUnit: 'px',
    get isExtendable() {
      return this.columns.length < 2;
    }
  },
  {
    addColumn(droppedResourceCid: string, position: number) {
      const newPostRowColumn = PostRowColumnModel.create({
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceCid, 0);
      this.columns.splice(position, 0, newPostRowColumn);

      if (this.columns.length === 2) {
        this.columns[0].width = 50;
        this.columns[1].width = 50;
      }
    },
    remove() {
      const postRows: PostRowModelType[] = getParent(this);
      if (postRows) {
        const indexOfThisPostRow = postRows.indexOf(this);
        postRows.splice(indexOfThisPostRow, 1);
      }
    },
    setWidth(width: number) {
      this.width = width;
    },
    setHeight(height: number) {
      this.height = height;
    },
    setMarginBottom(marginBottom: number) {
      this.marginBottom = marginBottom;
    },
    setMarginBottomUnit(unit: string) {
      this.marginBottomUnit = unit;
    }
  }
);

export type PostRowModelType = typeof PostRowModel.Type;

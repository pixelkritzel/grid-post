import { types, getParent } from 'mobx-state-tree';

import appStore from './app';
import { PostRowModelType } from './post-row';
import { PostRowContentModel } from './post-row-content';

import getId from '../helpers/get-id';

export const PostRowColumnModel = types.model(
  'PostRowColumnModel',
  {
    cid: types.identifier,
    contents: types.array(PostRowContentModel),
    width: 100,
    get isExtendable() {
      return this.contents.length < 2;
    }
  },
  {
    addResource(droppedResourceCid: string, position: number) {
      const droppedResource = appStore.data.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.contents.splice(
          position,
          0,
          PostRowContentModel.create({
            cid: getId('post-row-content'),
            resource: droppedResource
          })
        );
        if (this.contents.length === 2) {
          this.contents[0].height = 50;
          this.contents[1].height = 50;
        }
      }
    },
    setWidth(width: number) {
      const otherColumnsWidth = 100 - width;
      const columns: PostRowColumnModelType[] = getParent(this, 1);
      const indexOfThis = columns.indexOf(this);
      this.width = width;
      if (columns.length > 1) {
        const otherColumn = columns[indexOfThis + 1];
        otherColumn.width = otherColumnsWidth;
      }
    },
    remove() {
      const parentPostRow: PostRowModelType = getParent(this, 2);
      const indexOfThis = parentPostRow.columns.indexOf(this);
      parentPostRow.columns.splice(indexOfThis, 1);
      if (parentPostRow.columns.length === 0) {
        parentPostRow.remove();
      } else if (parentPostRow.columns.length === 1) {
        console.log('SHould be set 100');
        parentPostRow.columns[0].setWidth(100);
      }
    }
  }
);

export type PostRowColumnModelType = typeof PostRowColumnModel.Type;

import { types, getParent } from 'mobx-state-tree';
import appStore from './app';
import { PostRowModelType } from './post-row';
import { PostRowContentModel } from './post-row-content';
import getId from '../helpers/get-id';
export const PostRowColumnModel = types
  .model('PostRowColumnModel', {
    cid: types.identifier(),
    contents: types.array(PostRowContentModel),
    width: 100
  })
  .views(self => ({
    get isExtendable() {
      return self.contents.length < 2;
    }
  }))
  .actions(self => {
    function addResource(droppedResourceCid: string, position: number) {
      const droppedResource = appStore.data.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        self.contents.splice(
          position,
          0,
          PostRowContentModel.create({
            cid: getId('post-row-content'),
            resource: droppedResource
          })
        );
        if (self.contents.length === 2) {
          self.contents[0].height = 50;
          self.contents[1].height = 50;
        }
      }
    }
    function setWidth(width: number) {
      const otherColumnsWidth = 100 - width;
      const columns: (typeof self)[] = getParent(self, 1);
      const indexOfThis = columns.indexOf(self);
      self.width = width;
      if (columns.length > 1) {
        const otherColumn = columns[indexOfThis + 1];
        otherColumn.width = otherColumnsWidth;
      }
    }
    function remove() {
      const parentPostRow: PostRowModelType = getParent(self, 2);
      const columns: (typeof self)[] = parentPostRow.columns;
      const indexOfThis = columns.indexOf(self);
      parentPostRow.removeColumn(indexOfThis);
    }
    function removeContent(indexOfContent: number) {
      self.contents.splice(indexOfContent, 1);
      if (self.contents.length === 0) {
        remove();
      } else if (self.contents.length === 1) {
        self.contents[0].setHeight(100);
      }
    }
    return {
      addResource,
      setWidth,
      remove,
      removeContent
    };
  });
export type PostRowColumnModelType = typeof PostRowColumnModel.Type;

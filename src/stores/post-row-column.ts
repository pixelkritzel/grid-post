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
        setContentHeight(100);
      }
    }
    function setContentHeight(height: number) {
      const { contents } = self;
      contents[0].height = height;
      if (contents.length > 1) {
        const otherContentsHeight = 100 - height;
        contents[1].height = otherContentsHeight;
      }
    }
    return {
      addResource,
      remove,
      removeContent,
      setContentHeight
    };
  });
export type PostRowColumnModelType = typeof PostRowColumnModel.Type;

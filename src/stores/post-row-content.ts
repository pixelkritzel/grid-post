import { types, getParent } from 'mobx-state-tree';
import resourceModel, { IResourceModelType } from './resource-model';
import { PostRowColumnModelType } from './post-row-column';
type DirectionsType = 'top' | 'right' | 'bottom' | 'left';
export const PostRowContentModel = types
  .model({
    cid: types.identifier(),
    resource: types.reference(resourceModel),
    height: 100,
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px'
  })
  .actions(self => {
    function setMargin(direction: DirectionsType, value: string) {
      const key = 'margin' + direction.charAt(0).toUpperCase() + direction.slice(1);
      self[key] = value;
    }
    function switchResource(newResource: IResourceModelType) {
      self.resource = newResource;
    }
    function remove() {
      const parentColumn: PostRowColumnModelType = getParent(self, 2);
      const contents: (typeof self)[] = parentColumn.contents;
      const indexOfThis = contents.indexOf(self);
      parentColumn.removeContent(indexOfThis);
    }
    return {
      setMargin,
      switchResource,
      remove
    };
  });
export type PostRowContentModelType = typeof PostRowContentModel.Type;

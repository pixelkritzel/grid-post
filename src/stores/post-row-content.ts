import { types, getParent } from 'mobx-state-tree';

import resourceModel from './resource-model';

import { PostRowColumnModelType } from './post-row-column';

type DirectionsType = 'top' | 'right' | 'bottom' | 'left';
export const PostRowContentModel = types.model(
  {
    cid: types.identifier(),
    resource: types.reference(resourceModel),
    height: 100,
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px'
  },
  {
    setHeight(height: number) {
      const contents: PostRowContentModelType[] = getParent(this, 1);
      const indexOfThis = contents.indexOf(this);
      this.height = height;
      if (contents.length > 1) {
        const otherContentsHeight = 100 - height;
        const otherContent = contents[indexOfThis + 1];
        otherContent.height = otherContentsHeight;
      }
    },
    setMargin(direction: DirectionsType, value: string) {
      const key = 'margin' + direction.charAt(0).toUpperCase() + direction.slice(1);
      this[key] = value;
    },
    remove() {
      const parentColumn: PostRowColumnModelType = getParent(this, 2);
      const indexOfThis = parentColumn.contents.indexOf(this);
      parentColumn.contents.splice(indexOfThis, 1);
      if (parentColumn.contents.length === 0) {
        parentColumn.remove();
      } else if (parentColumn.contents.length === 1) {
        parentColumn.contents[0].setHeight(100);
      }
    }
  }
);

export type PostRowContentModelType = typeof PostRowContentModel.Type;

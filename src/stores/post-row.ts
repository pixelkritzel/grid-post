import { types, getParent } from 'mobx-state-tree';

import resourceModel from './resource-model';
import dataStore from './data';

type DirectionsType = 'top' | 'right' | 'bottom' | 'left';
export const PostRowContentModel = types.model(
  {
    resource: types.reference(resourceModel),
    height: 100,
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px'
  },
  {
    setHeight(height: number) {
      const otherContentsHeight = 100 - height;
      const contents: PostRowContentModelType[] = getParent(this, 1);
      const indexOfThis = contents.indexOf(this);
      const otherColumn = contents[indexOfThis + 1];
      this.height = height;
      otherColumn.height = otherContentsHeight;
    },
    setMargin(direction: DirectionsType, value: string) {
      const key = 'margin' + direction.charAt(0).toUpperCase() + direction.slice(1);
      this[key] = value;
    }
  }
);

export type PostRowContentModelType = typeof PostRowContentModel.Type;

export const PostRowColumnModel = types.model(
  'PostRowColumnModel',
  {
    contents: types.array(PostRowContentModel),
    width: 100,
    get isExtendable() {
      return this.contents.length < 2;
    }
  },
  {
    addResource(droppedResourceCid: string, position: number) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.contents.splice(
          position,
          0,
          PostRowContentModel.create({
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
      const otherColumn = columns[indexOfThis + 1];
      this.width = width;
      otherColumn.width = otherColumnsWidth;
    }
  }
);

export type PostRowColumnModelType = typeof PostRowColumnModel.Type;

export const PostRowModel = types.model(
  'PostRowModel',
  {
    cid: types.identifier(),
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
    destroy() {
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

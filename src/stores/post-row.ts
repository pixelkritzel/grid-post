import { types, getParent } from 'mobx-state-tree';

import resourceModel from './resource-model';
import dataStore from './data';

export const PostRowContentModel = types.model(
  {
    resource: types.reference(resourceModel),
    height: 100
  },
  {
    setHeight(height: number) {
      const otherContentsHeight = 100 - height;
      const contents: PostRowContentModelType[] = getParent(this, 1);
      const indexOfThis = contents.indexOf(this);
      const otherColumn = contents[indexOfThis + 1];
      this.height = height;
      otherColumn.height = otherContentsHeight;
    }
  }
);

export type PostRowContentModelType = typeof PostRowContentModel.Type;

export const PostRowColumnModel = types.model(
  'PostRowColumnModel',
  {
    contents: types.array(PostRowContentModel),
    width: 100
  },
  {
    addResource(droppedResourceCid: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.contents.push(
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
    columns: types.array(PostRowColumnModel),
    width: 16,
    height: 9,
    marginBottom: 8,
    marginBottomUnit: 'px'
  },
  {
    addColumn(droppedResourceCid: string) {
      const newPostRowColumn = PostRowColumnModel.create({
        contents: []
      });
      newPostRowColumn.addResource(droppedResourceCid);
      this.columns.push(newPostRowColumn);

      if (this.columns.length === 2) {
        this.columns[0].width = 50;
        this.columns[1].width = 50;
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

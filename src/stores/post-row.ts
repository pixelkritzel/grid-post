import { types, getParent } from 'mobx-state-tree';

import resourceModel from './resource-model';
import dataStore from './data';

export const PostRowColumnModel = types.model(
  'PostRowColumnModel',
  {
    resources: types.array(types.reference(resourceModel)),
    width: 100
  },
  {
    addResource(droppedResourceCid: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.resources.push(droppedResource);
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
    columns: types.array(PostRowColumnModel)
  },
  {
    addColumn(droppedResourceCid: string) {
      const droppedResource = dataStore.resources.find(resource => resource.cid === droppedResourceCid);
      if (droppedResource) {
        this.columns.push(
          PostRowColumnModel.create({
            resources: [droppedResource]
          })
        );
      }
      if (this.columns.length === 2) {
        this.columns[0].width = 50;
        this.columns[1].width = 50;
      }
    }
  }
);

export type PostRowModelType = typeof PostRowModel.Type;

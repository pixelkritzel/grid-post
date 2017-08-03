import { types } from 'mobx-state-tree';

export interface ResourceTextType {
  type: string;
}

export interface ResourceImageType {
  type: string;
  dataUrl: string;
}

export type ResourceType = ResourceTextType | ResourceImageType;

const resourceModel = types.model({
  type: types.string,
  dataUrl: types.optional(types.string, '')
});

export default resourceModel;

import { types } from 'mobx-state-tree';

export interface ResourceTextType {
  type: string;
}

export interface ResourceImageType {
  type: string;
  dataUrl: string;
}

export type ResourceType = ResourceTextType | ResourceImageType;

const ResourceModel = types.model({
  cid: types.identifier(),
  type: types.string,
  dataUrl: ''
});

export type IResourceModelType = typeof ResourceModel.Type;
export default ResourceModel;

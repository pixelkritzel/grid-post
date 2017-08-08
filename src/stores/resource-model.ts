import { types } from 'mobx-state-tree';

export interface ResourceTextType {
  type: string;
}

export interface ResourceImageType {
  type: string;
  path: string;
  fileName: string;
}

export type ResourceType = ResourceTextType | ResourceImageType;

const ResourceModel = types.model('ResourceModel', {
  cid: types.identifier(),
  type: types.string,
  path: '',
  fileName: ''
});

export type IResourceModelType = typeof ResourceModel.Type;
export default ResourceModel;

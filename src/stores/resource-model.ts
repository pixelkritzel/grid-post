import { getRoot, types } from "mobx-state-tree";
export interface ResourceTextType {
    type: string;
}
export interface ResourceImageType {
    type: string;
    path: string;
    fileName: string;
}
export type ResourceType = ResourceTextType | ResourceImageType;
const ResourceModel = types.model("ResourceModel", {
    cid: types.identifier(),
    type: types.string,
    path: "",
    fileName: ""
}).views(self => ({
    get isUsed() {
        const dataStore = getRoot(self);
        return dataStore.post.resourceIsUsed(self);
    }
}));
export type IResourceModelType = typeof ResourceModel.Type;
export default ResourceModel;

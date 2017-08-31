import { types } from "mobx-state-tree";
import getId from "../helpers/get-id";
import ResourceModel, { ResourceType, IResourceModelType } from "./resource-model";
import PostModel from "./post";
export const emptyDataStore = {
    resources: [
        {
            cid: getId("resource"),
            type: "text"
        }
    ],
    post: {
        cid: getId("post"),
        rows: []
    }
};
export const DataStoreModel = types.model("DataStore", {
    resources: types.array(ResourceModel),
    post: PostModel
}).actions(self => {
    function addResource(resource: ResourceType) {
        self.resources.push(ResourceModel.create({ cid: getId("resource"), ...resource }));
    }
    function removeResource(resource: IResourceModelType) {
        if (self.post.resourceIsUsed(resource)) {
            throw new Error("Can't remove resource because it's used in the post");
        }
        const indexOfResource = self.resources.indexOf(resource);
        if (indexOfResource > -1) {
            self.resources.splice(indexOfResource, 1);
        }
    }
    return {
        addResource,
        removeResource
    };
});
// onPatch(dataStore, () => {
//   const stringifiedStore = JSON.stringify(dataStore);
//   localStorage.setItem('latest', stringifiedStore);
// });
export type DataStoreType = typeof DataStoreModel.Type;

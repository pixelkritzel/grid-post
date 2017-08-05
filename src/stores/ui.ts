import { types } from 'mobx-state-tree';

const UiStoreModel = types.model('UiStore', {}, {});

const uiStore = UiStoreModel.create();

export default uiStore;

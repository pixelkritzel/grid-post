import { observable, IObservableObject } from 'mobx';
import { onPatch } from 'mobx-state-tree';
import { DataStoreModel, DataStoreType, emptyDataStore } from './data';
import uiStore, { uiStoreType } from './ui';
import electronRequire from '../helpers/electron-require';
const fs = electronRequire('fs');

type appStoreType = {
  data: DataStoreType;
  ui: uiStoreType;
  syncedResources: string[];
} & IObservableObject;
const initalDataStore = DataStoreModel.create(emptyDataStore);
const appStore: appStoreType = observable({
  data: initalDataStore,
  ui: uiStore,
  syncedResources: []
});

// tslint:disable-next-line
window['appStore'] = appStore;

export default appStore;
const electron = electronRequire('electron');
function sendResourcesToServer() {
  appStore.syncedResources = JSON.parse(
    electron.ipcRenderer.sendSync('resources', JSON.stringify(appStore.data.resources))
  );
}
onPatch(appStore.data, sendResourcesToServer);
sendResourcesToServer();

function saveStore(savePath: string) {
  fs.writeFile(savePath, JSON.stringify(appStore.data, undefined, 2), (err: {}) => {
    if (err) {
      console.log(`Error on saving ${savePath}`);
      console.log(err);
    } else {
      console.log('savedStore');
    }
  });
}
export { saveStore };

function loadStore(loadPath: string) {
  fs.readFile(loadPath, { encoding: 'utf8' }, (err: {}, jsonString: string) => {
    let loadedStore: {} = {};
    if (err) {
      console.log(err);
    } else {
      try {
        loadedStore = JSON.parse(jsonString);
      } catch (e) {
        console.log(e);
        return;
      }
      appStore.ui.projectPath = loadPath;
      const newDataStore = DataStoreModel.create(loadedStore);
      appStore.data = newDataStore;
      onPatch(appStore.data, sendResourcesToServer);
      sendResourcesToServer();
    }
  });
}
export { loadStore };

function newProject() {
  const newDataStore = DataStoreModel.create(emptyDataStore);
  appStore.data = newDataStore;
  appStore.ui.projectPath = null;
  onPatch(appStore.data, sendResourcesToServer);
}
export { newProject };

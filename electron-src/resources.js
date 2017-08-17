const electron = require('electron');
let resources = [];

electron.ipcMain.on('resources', (event, arg) => {
  try {
    resources = JSON.parse(arg);
  } catch (e) {
    console.error(arg);
  }
  const syncedResources = resources.map(resource => resource.cid);
  event.returnValue = JSON.stringify(syncedResources);
});

module.exports = function getResources() {
  return resources;
};

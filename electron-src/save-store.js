const electron = require('electron');
const fs = require('fs');

const { ipcMain } = electron;

ipcMain.on('save-store', (event, argJSON) => {
  const arg = JSON.parse(argJSON);
  const { savePath, content } = arg;
  fs.writeFile(savePath, JSON.stringify(content, undefined, 2), err => {
    if (err) {
      console.log(`Error on saving ${savePath}`);
      console.log(err);
      event.sender.send('save-store-failed');
    } else {
      event.sender.send('save-store-success');
    }
  });
});

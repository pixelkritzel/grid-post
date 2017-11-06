import * as React from 'react';

import exportProject from '../export-project';
import electronRequire from '../helpers/electron-require';

const { dialog } = electronRequire('electron').remote;

import appStore, { loadStore, newProject, saveStore } from '../stores/app';
class Navbar extends React.Component {
  exportProject = () => {
    const dialogResult: string[] | undefined = dialog.showOpenDialog({
      properties: ['openDirectory', 'createDirectory']
    });
    if (dialogResult) {
      exportProject(dialogResult[0]);
    }
  };

  loadProject = () => {
    const dialogResult = dialog.showOpenDialog({
      filters: [{ name: 'Grid-Post file', extensions: ['grid-post'] }],
      properties: ['openFile']
    });
    if (dialogResult) {
      loadStore(dialogResult[0]);
    }
  };

  saveProject = () => {
    if (appStore.ui.projectPath) {
      saveStore(appStore.ui.projectPath);
    } else {
      this.saveProjectAs();
    }
  };

  saveProjectAs = () => {
    const savePath: string | undefined = dialog.showSaveDialog({
      filters: [{ name: 'Grid-Post', extensions: ['grid-post'] }]
    });
    if (savePath) {
      saveStore(savePath);
    }
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Grid-Post
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="nav-link btn btn-link" onClick={newProject}>
              New
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn btn-link" onClick={this.loadProject}>
              Load
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn btn-link" onClick={this.saveProjectAs}>
              Save as ...
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn btn-link" onClick={this.saveProject}>
              Save
            </button>
          </li>
          <li>
            <button type="button" className="nav-link btn btn-link" onClick={this.exportProject}>
              Export
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

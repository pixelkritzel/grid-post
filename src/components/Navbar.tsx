import * as React from 'react';
const { dialog } = window['require']('electron').remote;

import { loadStore, newProject, saveStore } from '../stores/app';

class Navbar extends React.Component {
  loadProject = () => {
    const { 0: loadPath } = dialog.showOpenDialog({
      filters: [{ name: 'JPEG', extensions: ['grid-post'] }],
      properties: ['openFile']
    });
    if (loadPath) {
      loadStore(loadPath);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Grid-Post
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <button type="button" className="nav-link btn-link" onClick={newProject}>
              Load
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn-link" onClick={this.loadProject}>
              Load
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn-link" onClick={this.saveProjectAs}>
              Save as ...
            </button>
          </li>
          <li className="nav-item">
            <button type="button" className="nav-link btn-link">
              Save
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;

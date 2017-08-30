import * as React from 'react';
const { dialog } = window['require']('electron').remote;

import { saveStore } from '../stores/data';

class Navbar extends React.Component {
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
            <button
              type="button"
              className="nav-link btn-link"
              onClick={() =>
                console.log(
                  dialog.showOpenDialog({
                    filters: [{ name: 'JPEG', extensions: ['grid-post'] }],
                    properties: ['openFile']
                  })
                )}
            >
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

import appStore from './stores/app';
import { Mode } from './stores/ui';

import electronRequire from './helpers/electron-require';
const fs = electronRequire('fs');

function exportProject(exportDirectory: string) {
  appStore.ui.mode = Mode.EXPORT;
  setTimeout(() => {
    const html = document.querySelector('.post-container')!.innerHTML;
    fs.writeFile(exportDirectory + '/index.html', html, console.error);
    appStore.ui.mode = Mode.DEV;
  });
}

export default exportProject;

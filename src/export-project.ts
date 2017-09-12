import { runInAction } from 'mobx';

import appStore, { Mode } from './stores/app';

import electronRequire from './helpers/electron-require';
const fs = electronRequire('fs');
const shelljs = electronRequire('shelljs');
const pretty = electronRequire('pretty');

const getHtmlPage = (html: string) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  ${html}
</body>
</html>`;

function exportProject(exportDirectory: string) {
  runInAction(() => {
    appStore.mode = Mode.EXPORT;
    appStore.exportDirectory = exportDirectory;
  });
  setTimeout(() => {
    const html: string = pretty(document.querySelector('.post-container')!.innerHTML);
    fs.writeFile(exportDirectory + '/_post.html', html, console.error);
    fs.writeFile(exportDirectory + '/index.html', getHtmlPage(html), console.error);
    shelljs.mkdir('-p', `${exportDirectory}/images`);
    shelljs.cp(appStore.data.post.allImagePaths, `${exportDirectory}/images`);
    runInAction(() => {
      appStore.mode = Mode.DEV;
      appStore.exportDirectory = null;
    });
  });
}

export default exportProject;

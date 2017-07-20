import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ImageUploader from './Image-Uploader';
import registerServiceWorker from './registerServiceWorker';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const DropApp = DragDropContext(HTML5Backend)(ImageUploader);

ReactDOM.render(<DropApp />, document.getElementById('root'));
registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

const DropApp = DragDropContext(HTML5Backend)(App);

ReactDOM.render(<DropApp />, document.getElementById('root'));

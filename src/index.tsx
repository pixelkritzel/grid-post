import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

const DropApp = DragDropContext(HTML5Backend)(App);

ReactDOM.render(<DropApp />, document.getElementById('root'));

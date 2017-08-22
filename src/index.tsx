import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

ReactDOM.render(<App />, document.getElementById('root'));

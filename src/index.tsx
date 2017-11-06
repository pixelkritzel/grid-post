import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './scss/App.css';

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

ReactDOM.render(<App />, document.getElementById('root'));

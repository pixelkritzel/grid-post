import React, { Component } from 'react';
import './App.css';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import store from './stores';
import { observer } from 'mobx-react';

const spec = {};

function inject(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  };
}

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = { src: '' };
  }

  componentWillReceiveProps(nextProps) {
    const { didDrop, item } = nextProps;
    if (didDrop) {
      console.log(item);
      item.files.forEach(image => {
        const reader = new FileReader();
        reader.onload = e => {
          image.dataUrl = e.target.result;
          store.addImage(image);
        };
        reader.readAsDataURL(image);
      });
    }
  }

  render() {
    const { connectDropTarget, isOver } = this.props;
    const classNames = ['App-intro'];
    if (isOver) classNames.push('hover');
    return connectDropTarget(
      <div className="App">
        <p className={classNames.join(' ')}>DropHere</p>
        {store.images.map((image, index) => {
          return <img alt="" src={image.dataUrl} key={index} />;
        })}
      </div>
    );
  }
}

export default DropTarget(NativeTypes.FILE, spec, inject)(observer(App));

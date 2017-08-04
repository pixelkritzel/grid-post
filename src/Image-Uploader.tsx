import * as React from 'react';
import './App.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { FileReaderEvent } from './helpers/FileReaderEvent';

import store from './stores';
import { ResourceImageType } from './stores/resource-model';

function readFileListToImages(fileList: File[]) {
  fileList.forEach((file: File) => {
    if (file && (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.gif'))) {
      const image: ResourceImageType = {
        type: 'image',
        dataUrl: ''
      };
      const reader = new FileReader();
      reader.onload = (e: FileReaderEvent) => {
        image.dataUrl = e.target.result;
        store.addResource(image);
      };

      reader.readAsDataURL(file);
    }
  });
}

class ImageUploader extends React.Component {
  @observable isFileDrag = false;

  onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.isFileDrag = event.dataTransfer.types.indexOf('Files') !== -1;
  };

  onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    this.isFileDrag = false;
  };

  onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.isFileDrag = false;
    const { dataTransfer } = event;
    const files = [];
    if (dataTransfer.items) {
      for (let i = 0; i < dataTransfer.items.length; i++) {
        const file = dataTransfer.items[i].getAsFile();
        if (file) {
          files.push(file);
        }
      }
      readFileListToImages(files);
    }
  };

  onFileSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.prototype.map.call(event.target.files, (file: File) => file);
      readFileListToImages(files);
    }
  };

  render() {
    const classNames = ['image-uploader'];
    if (this.isFileDrag) {
      classNames.push('image-uploader--hover');
    }
    return (
      <div
        className={classNames.join(' ')}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onDragLeave={this.onDragLeave}
      >
        <label htmlFor="fileSelect" className="btn btn-primary" role="button">
          Datei auswählen
          <input
            type="file"
            id="fileSelect"
            className="sr-only <sr-only-focusable></sr-only-focusable>"
            onChange={this.onFileSelectChange}
          />
        </label>
        {this.isFileDrag ? <p>DropHere</p> : this.props.children}
      </div>
    );
  }
}

export default observer(ImageUploader);

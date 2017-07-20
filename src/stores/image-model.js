import { types } from 'mobx-state-tree';

const imageModel = types.model({
  path: '',
  dataUrl: ''
});

export default imageModel;

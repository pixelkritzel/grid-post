import { types } from 'mobx-state-tree';

import getId from '../helpers/getId';

import { postRowModel } from './post-row';

export const PostModel = types.model({
  cid: types.identifier(),
  rows: types.array(postRowModel)
});

const post = PostModel.create({
  cid: getId('post'),
  rows: []
});

export default post;

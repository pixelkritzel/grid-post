import * as React from 'react';

import InputGroup from './forms/Input-Group';

import appStore from '../stores/app';
import { PostRowContentModelType } from '../stores/post-row-content';

const renderEditForm = (content: PostRowContentModelType) =>
  (appStore.ui.EditForm = () => {
    return (
      <div>
        <h1>Edit picture</h1>
        <div className="form-inline">
          <InputGroup
            identifier="content-margin-top"
            labelHtml="Margin Top"
            inputType="text"
            inputValue={content.marginTop}
            onChange={event => content.setMargin('top', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-right"
            labelHtml="Margin Right"
            inputType="text"
            inputValue={content.marginRight}
            onChange={event => content.setMargin('right', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-bottom"
            labelHtml="Margin Bottom"
            inputType="text"
            inputValue={content.marginBottom}
            onChange={event => content.setMargin('bottom', event.target.value)}
          />
          <InputGroup
            identifier="content-margin-left"
            labelHtml="Margin Left"
            inputType="text"
            inputValue={content.marginLeft}
            onChange={event => content.setMargin('left', event.target.value)}
          />
        </div>
      </div>
    );
  });

export default renderEditForm;

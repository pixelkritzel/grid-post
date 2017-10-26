import * as React from 'react';

import appStore from '../stores/app';

import InputGroup from './forms/Input-Group';

const DefaultStyleEditor = () => (
  <div>
    <h2>Default Style Editor</h2>
    <dl>
      <InputGroup
        identifier="defaultStylesRowMarginBottom"
        labelHtml="post row default margin bottom"
        inputType="text"
        inputValue={appStore.data.post.defaultStyles.rowMarginBottom}
        onChange={event => appStore.data.post.setDefaultStyle('rowMarginBottom', event.target.value)}
      />
      <InputGroup
        identifier="defaultStylesRowRatioWidth"
        labelHtml="post row default ratio width"
        inputType="number"
        inputValue={appStore.data.post.defaultStyles.rowRatioWidth.toString()}
        onChange={event => appStore.data.post.setDefaultStyle('rowRatioWidth', parseFloat(event.target.value))}
      />
      <InputGroup
        identifier="defaultStylesRowRatioHeight"
        labelHtml="post row default ratio height"
        inputType="number"
        inputValue={appStore.data.post.defaultStyles.rowRatioHeight.toString()}
        onChange={event => appStore.data.post.setDefaultStyle('rowRatioHeight', parseFloat(event.target.value))}
      />
    </dl>
  </div>
);

export default DefaultStyleEditor;

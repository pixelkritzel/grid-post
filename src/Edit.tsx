import * as React from 'react';

import uiStore, { FunctionalComponent } from './stores/ui';

type EditPropsType = {
  EditForm: FunctionalComponent;
};

export default class Edit extends React.Component<EditPropsType, {}> {
  render() {
    const { EditForm } = this.props;
    return (
      <div>
        <EditForm />
        <button type="button" className="btn btn-primary" onClick={() => (uiStore.EditForm = null)}>
          Close edit form
        </button>
      </div>
    );
  }
}

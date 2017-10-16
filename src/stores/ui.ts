import { observable, IObservableObject } from 'mobx';
export interface FunctionalComponent {
  (): JSX.Element;
}

export type uiStoreType = {
  OverlayContent: FunctionalComponent | null;
  EditForm: FunctionalComponent | null;
  projectPath: string | null;
} & IObservableObject;

export const uiStoreDefaultValue = {
  OverlayContent: null,
  EditForm: null,
  projectPath: null
};

const uiStore: uiStoreType = observable(uiStoreDefaultValue);
export default uiStore;

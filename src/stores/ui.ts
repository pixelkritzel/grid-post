import { observable, IObservableObject } from 'mobx';
export interface FunctionalComponent {
  (): JSX.Element;
}

export type uiStoreType = {
  OverlayContent: FunctionalComponent | null;
  EditForm: FunctionalComponent | null;
  projectPath: string | null;
} & IObservableObject;
const uiStore: uiStoreType = observable({
  OverlayContent: null,
  EditForm: null,
  projectPath: null
});
export default uiStore;

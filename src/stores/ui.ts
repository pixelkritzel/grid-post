import { observable, IObservableObject } from 'mobx';
export interface FunctionalComponent {
  (): JSX.Element;
}

export enum Mode {
  DEV,
  EXPORT
}

export type uiStoreType = {
  OverlayContent: FunctionalComponent | null;
  EditForm: FunctionalComponent | null;
  projectPath: string | null;
  mode: Mode;
} & IObservableObject;
const uiStore: uiStoreType = observable({
  OverlayContent: null,
  EditForm: null,
  projectPath: null,
  mode: Mode.DEV
});
export default uiStore;

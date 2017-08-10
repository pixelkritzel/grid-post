import { observable, IObservableObject } from 'mobx';

interface OverlayFunction {
  (): JSX.Element;
}

type uiStoreType = {
  OverlayContent: OverlayFunction | null;
} & IObservableObject;

const uiStore: uiStoreType = observable({
  OverlayContent: null
});

export default uiStore;

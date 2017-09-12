import appStore, { Mode } from '../stores/app';
import { IResourceModelType } from '../stores/resource-model';

export default function getImgSrc(resource: IResourceModelType) {
  if (appStore.mode === Mode.DEV) {
    return `http://localhost:4500/images?cid=${encodeURIComponent(resource.cid.toString())}`;
  } else {
    return `images/${resource.fileName}`;
  }
}

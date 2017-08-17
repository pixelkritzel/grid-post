import { IdType } from './getId';
export default function getImgSrc(resourceId: IdType) {
  return `http://localhost:4500/images?cid=${encodeURIComponent(resourceId)}`;
}

export default function getImgSrc(path: string) {
  return `http://localhost:4500/images?imagePath=${encodeURIComponent(path)}`;
}

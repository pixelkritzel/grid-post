let id = 0;

export default function getId(prefix: string = '') {
  return prefix ? `${prefix}-${id++}` : id++;
}

let id = 0;

export default function getId(prefix: string = '') {
  const timestampedId = `${new Date().getTime()}-${id++}`;
  return prefix ? `${prefix}-${timestampedId}` : timestampedId;
}

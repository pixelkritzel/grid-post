let id = 0;

export type IdType = string;

export default function getId(prefix: string = ''): IdType {
  const timestampedId = `${new Date().getTime()}-${id++}`;
  return prefix ? `${prefix}-${timestampedId}` : timestampedId;
}

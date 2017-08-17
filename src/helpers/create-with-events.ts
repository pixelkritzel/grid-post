import { onAction, getPath } from 'mobx-state-tree';

export function createWithEvents(model: any, ...modelArguments: any[]) {
  const newInstance = model.create(...modelArguments);
  onAction(newInstance, e => {
    console.log(getPath(newInstance));
    console.log(e);
  });
  return newInstance;
}

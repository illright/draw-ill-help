const registry = new Map<number, any>();
let idCounter = 0;

export function track(object: any): number {
  registry.set(idCounter, object);
  return idCounter++;
}

export function untrack(id: number): any {
  const object = registry.get(id);
  registry.delete(id);
  return object;
}

export function hasItem(arr?: any): boolean {
  return Boolean(Array.isArray(arr) && arr?.length);
}

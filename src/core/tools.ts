export const omit = (obj: any, key: any) => {
  const copy = { ...obj };
  [].concat(key).forEach(k => {
    delete copy[k];
  });
  return copy;
}
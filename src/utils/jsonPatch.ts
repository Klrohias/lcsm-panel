export type JsonPatchOperation = 'replace' | 'add' | 'remove'

export interface JsonPatchEntry {
  path: string,
  value: any,
  op: JsonPatchOperation
}

export type JsonPatchDocument = JsonPatchEntry[]

export function compareObject<T>(from: T, to: T, pathRoot = '') {
  const result: JsonPatchDocument = []
  for (const key in from) {
    if (Object.prototype.hasOwnProperty.call(from, key)) {
      const elementFrom = from[key];
      const elementTo = to[key];
      if (elementFrom !== elementTo) {
        result.push({
          op: 'replace',
          path: `${pathRoot}/${key}`,
          value: elementTo
        })
      }
    }
  }

  return result
}
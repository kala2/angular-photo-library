export const appendOrDelete = <T>(
  array: T[],
  item: T,
  conditionFn: (existingItem: T) => boolean
): T[] => {
  const shouldAppend = !array.some(conditionFn)
  if (shouldAppend) {
    return [...array, item]
  } else {
    return array.filter((existingItem) => !conditionFn(existingItem))
  }
}

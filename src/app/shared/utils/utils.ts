export const appendOrDelete = (array: number[], item: number): number[] => {
  const shouldAppend = !array.includes(item)
  if (shouldAppend) {
    return [...array, item]
  } else {
    return array.filter((existingItem) => existingItem !== item)
  }
}

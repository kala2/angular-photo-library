export const appendOrDelete = (array: string[], item: string): string[] => {
  const shouldAppend = !array.includes(item)
  if (shouldAppend) {
    return [...array, item]
  } else {
    return array.filter((existingItem) => existingItem !== item)
  }
}

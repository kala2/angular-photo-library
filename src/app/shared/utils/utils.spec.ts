import { appendOrDelete } from './utils'

describe('appendOrDelete', () => {
  it('should append the item if condition does not match any existing item', () => {
    const array = [1, 2, 3]
    const result = appendOrDelete(array, 4)
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('should handle empty array correctly by appending the item', () => {
    const array: number[] = []
    const result = appendOrDelete(array, 1)
    expect(result).toEqual([1])
  })

  it('should delete all items matching the condition', () => {
    const array = [1, 2, 2, 3]
    const result = appendOrDelete(array, 2)
    expect(result).toEqual([1, 3])
  })

  it('should not mutate the original array', () => {
    const array = [1, 2, 3]
    appendOrDelete(array, 4)
    expect(array).toEqual([1, 2, 3])
  })
})

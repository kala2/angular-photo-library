import { appendOrDelete } from './utils'

describe('appendOrDelete', () => {
  it('should append item if not already in array', () => {
    const result = appendOrDelete(['a', 'b'], 'c')
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should remove item if it already exists in array', () => {
    const result = appendOrDelete(['a', 'b', 'c'], 'b')
    expect(result).toEqual(['a', 'c'])
  })

  it('should return a new array reference when appending', () => {
    const arr = ['x']
    const result = appendOrDelete(arr, 'y')
    expect(result).not.toBe(arr)
  })

  it('should return a new array reference when deleting', () => {
    const arr = ['x', 'y']
    const result = appendOrDelete(arr, 'y')
    expect(result).not.toBe(arr)
  })

  it('should handle empty array when appending', () => {
    const result = appendOrDelete([], 'first')
    expect(result).toEqual(['first'])
  })

  it('should handle removing only element in array', () => {
    const result = appendOrDelete(['only'], 'only')
    expect(result).toEqual([])
  })

  it('should not mutate the original array', () => {
    const arr = ['a', 'b']
    const result = appendOrDelete(arr, 'b')
    expect(arr).toEqual(['a', 'b'])
    expect(result).toEqual(['a'])
  })
})

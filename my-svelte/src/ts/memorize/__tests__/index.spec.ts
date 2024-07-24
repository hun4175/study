// const add: Func= (valueA: number, valueB : number) => {
// 	return valueA + valueB
// }

import { memorize, type Func } from '../index'
import { describe, expect, it, vi } from 'vitest'

describe('memorize function', () => {
  it('should not cache non-primitive arguments (function)', () => {
    const spyConsoleLog = vi.spyOn(console, 'log')
    const nonPrimitiveFunc: Func = () => {
      console.log('Non-primitive function called')
    }

    const memoizedFunc = memorize(nonPrimitiveFunc)

    memoizedFunc()
    memoizedFunc()

    // The non-primitive function should be called twice since it's not cached
    expect(spyConsoleLog).toHaveBeenCalledTimes(2)
  })

  it('should not cache non-primitive arguments (object)', () => {
    const spyConsoleLog = vi.spyOn(console, 'log')
    const nonPrimitiveObj = {
      method: () => {
        console.log('Non-primitive object method called')
      },
    }

    const memoizedFunc = memorize(nonPrimitiveObj.method)

    memoizedFunc()
    memoizedFunc()

    // The non-primitive object method should be called twice since it's not cached
    expect(spyConsoleLog).toHaveBeenCalledTimes(2)
  })

  it('should not cache non-primitive arguments (array)', () => {
    const spyConsoleLog = vi.spyOn(console, 'log')
    const nonPrimitiveArray = [1, 2, 3]
    const func: Func = (arr: number[]) => {
      console.log('Non-primitive array function called')
      return arr.reduce((acc, val) => acc + val, 0)
    }

    const memoizedFunc = memorize(func)

    memoizedFunc(nonPrimitiveArray)
    memoizedFunc(nonPrimitiveArray)

    // The non-primitive array function should be called twice since it's not cached
    expect(spyConsoleLog).toHaveBeenCalledTimes(2)
  })

  it('should not cache non-primitive arguments (nested object)', () => {
    const spyConsoleLog = vi.spyOn(console, 'log')
    const nonPrimitiveNestedObj = {
      innerObj: {
        method: () => {
          console.log('Non-primitive nested object method called')
        },
      },
    }

    const memoizedFunc = memorize(nonPrimitiveNestedObj.innerObj.method)

    memoizedFunc()
    memoizedFunc()

    // The non-primitive nested object method should be called twice since it's not cached
    expect(spyConsoleLog).toHaveBeenCalledTimes(2)
  })

  it('should not cache non-primitive arguments (nested array)', () => {
    const spyConsoleLog = vi.spyOn(console, 'log')
    const nonPrimitiveNestedArray = [[1, 2], [3, 4]]
    const func: Func = (arr: number[][]) => {
      console.log('Non-primitive nested array function called')
      return arr.reduce((acc, subArr) => acc + subArr.reduce((innerAcc, val) => innerAcc + val, 0), 0)
    }

    const memoizedFunc = memorize(func)

    memoizedFunc(nonPrimitiveNestedArray)
    memoizedFunc(nonPrimitiveNestedArray)

    // The non-primitive nested array function should be called twice since it's not cached
    expect(spyConsoleLog).toHaveBeenCalledTimes(2)
  })

  it('should cache the add function', () => {
    let count = 0
    const add: Func = (valueA: number, valueB: number) => {
      count++
      return valueA + valueB
    }
    const memoizedAdd = memorize(add)
    const result1 = memoizedAdd(1, 2)
    expect(count).toBe(1)
    expect(result1).toBe(3)
    const result2 = memoizedAdd(1, 2)
    expect(count).toBe(1)
    expect(result2).toBe(3)
    const result3 = memoizedAdd(2, 2)
    expect(count).toBe(2)
    expect(result3).toBe(4)
  })
})
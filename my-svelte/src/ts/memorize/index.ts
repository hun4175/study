// eslint-disable-next-line
export type Func = (...args: any[]) => any
export type MemorizeFunction = (func: Func) =>  ReturnType<Func>

// 전달받은 함수의 결과를 배열에 담아 캐싱하는 메모리제이션 함수
export const memorize: MemorizeFunction = (func: Func) => {
  const cache: Record<string, unknown> = {}

  return (...args: Parameters<typeof func>) => {
    const key = JSON.stringify(args)

    if (cache[key]) {
      console.log('Cache hit!')
      return cache[key]
    }

    const result = func(...args)
    cache[key] = result
    return result
  }
}
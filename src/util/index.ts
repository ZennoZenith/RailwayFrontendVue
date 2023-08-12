interface AsyncFunction<T> {
  (...args: any): Promise<T>
}

// export function debounce<T>(callback: AsyncFunction<T>, delay = 1000) {
//   return function (...args: any) {
//     setTimeout(async () => {
//       await callback(...args)
//     }, delay)
//   }
// }

export function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number,
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise(resolve => {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        resolve(fn(args))
      }, ms)
    })

  const teardown = () => clearTimeout(timer)

  return [debouncedFunc, teardown]
}

export function range(start: number, end?: number) {
  if (!end) {
    end = start
    start = 0
  }
  start -= 1
  end -= 1
  let arr = []
  while (start++ !== end) {
    arr.push(start)
  }
  return arr
}

export function HHMMtoMinutes(HHMM: string | undefined | null): number | undefined {
  if (!HHMM) return undefined
  const HHMMSplit: string[] = HHMM.split(':')
  if (HHMMSplit.length < 2) return undefined
  const HH: number = Number(HHMMSplit[0])
  const MM: number = Number(HHMMSplit[1])

  if (isNaN(HH) || isNaN(MM)) return undefined
  if (!Number.isInteger(HH) || !Number.isInteger(MM)) return undefined

  return HH * 60 + MM
}

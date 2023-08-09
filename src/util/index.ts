export function debounce(callback: Function, delay = 1000) {
  return function (...args: any) {
    setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

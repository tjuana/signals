import { createSignal, effect } from './createSignal'

export function computed<T>(fn: () => T) {
  const [get, set] = createSignal(fn())

  effect(() => {
    set(fn())
  })

  return get
}
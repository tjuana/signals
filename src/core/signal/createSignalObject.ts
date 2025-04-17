import { createSignal } from './createSignal'

export function createSignalObject<T>(initial: T) {
  const [get, set] = createSignal(initial)

  return {
    get value() {
      return get()
    },
    set: set,
    update: (fn: (prev: T) => T) => set(fn)
  }
}

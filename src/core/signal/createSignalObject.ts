import { createSignal } from './createSignal'

export const createSignalObject = <T>(initial: T) => {
  const [get, set, subscribe] = createSignal(initial)

  return {
    get value() {
      return get()
    },
    set: set,
    update: (fn: (prev: T) => T) => set(fn),
    subscribe
  }
}

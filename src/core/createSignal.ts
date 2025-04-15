type Effect = () => void

let currentEffect: Effect | null = null

export function createSignal<T>(initial: T): [() => T, (v: T | ((prev: T) => T)) => void] {
  let value = initial
  const subscribers = new Set<Effect>()

  const get = () => {
    if (currentEffect) subscribers.add(currentEffect)
    return value
  }

  const set = (next: T | ((prev: T) => T)) => {
    value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
    subscribers.forEach(fn => fn())
  }

  return [get, set]
}

export function effect(fn: Effect) {
  currentEffect = fn
  fn()
  currentEffect = null
}
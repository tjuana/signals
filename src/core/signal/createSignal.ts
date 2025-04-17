import { logSignal } from "../dev/logger/logger"

type Effect = () => void

let currentEffect: Effect | null = null
let signalId = 0

export function createSignal<T>(
  initial: T,
  label?: string
): [() => T, (v: T | ((prev: T) => T)) => void, (fn: () => void) => () => void] {
  let value = initial
  const subscribers = new Set<Effect>()
  const debugLabel = label ?? `signal-${signalId++}`

  logSignal(debugLabel, 'init', value)

  const get = () => {
    logSignal(debugLabel, 'get', value)
    if (currentEffect) {
      subscribers.add(currentEffect)
      logSignal(debugLabel, 'sub', currentEffect.name || 'anonymous effect')
    }
    return value
  }

  const set = (next: T | ((prev: T) => T)) => {
    const old = value
    value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
    logSignal(debugLabel, 'set', { from: old, to: value })
    subscribers.forEach(fn => fn())
  }

  const subscribe = (fn: () => void) => {
    subscribers.add(fn)
    logSignal(debugLabel, 'sub', fn.name || 'anonymous')
    return () => {
      subscribers.delete(fn)
      logSignal(debugLabel, 'unsub', fn.name || 'anonymous')
    }
  }

  return [get, set, subscribe]
}

export function effect(fn: Effect) {
  currentEffect = fn
  fn()
  currentEffect = null
}
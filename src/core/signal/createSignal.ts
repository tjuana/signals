import { emit } from '../dev/logger/eventBus'
import { getCurrentSource } from '../dev/logger/context'

type Effect = () => void

let currentEffect: Effect | null = null
let signalId = 0

export function createSignal<T>(
  initial: T,
  label?: string
): [() => T, (v: T | ((prev: T) => T)) => void, (fn: () => void) => () => void] {
  let value = initial
  const subscribers = new Set<Effect>()
  const signal = label ?? `signal-${signalId++}`
  const source = getCurrentSource()

  emit('signal:init', { signal, value, source })

  const get = () => {
    emit('signal:get', { signal, value, source })
    if (currentEffect) {
      subscribers.add(currentEffect)
      emit('signal:sub', {
        signal,
        effect: currentEffect.name || 'anonymous',
        source
      })
    }
    return value
  }

  const set = (next: T | ((prev: T) => T)) => {
    const from = value
    value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
    emit('signal:set', { signal, from, to: value, source })
    for (const fn of subscribers) fn()
  }

  const subscribe = (fn: () => void) => {
    subscribers.add(fn)
    emit('signal:sub', { signal, effect: fn.name || 'anonymous', source })
    return () => {
      subscribers.delete(fn)
      emit('signal:unsub', { signal, effect: fn.name || 'anonymous', source })
    }
  }

  return [get, set, subscribe]
}

export function effect(fn: Effect) {
  currentEffect = fn
  fn()
  currentEffect = null
}
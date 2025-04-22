import { emit } from '../dev/logger/eventBus'
import { getCurrentSource } from '../dev/logger/context'

export type Effect = () => void

let currentEffect: Effect | null = null
let signalId = 0

export function createSignal<T>(
  initial: T,
  label?: string
): [() => T, (v: T | ((prev: T) => T)) => void, (fn: () => void) => () => void] {
  let value = initial
  const subscribers = new Set<Effect>()
  const id = `signal-${signalId++}`
  const name = label ?? id
  const sourceObj = getCurrentSource()
  const source = sourceObj
    ? `${sourceObj.name}${sourceObj.instance ? ':' + sourceObj.instance : ''}`
    : undefined

  emit('signal:init', {
    id,
    name,
    value,
    source,
    timestamp: Date.now()
  })

  const get = () => {
    emit('signal:get', {
      id,
      name,
      value,
      source,
      timestamp: Date.now()
    })

    if (currentEffect) {
      subscribers.add(currentEffect)
      emit('signal:sub', {
        id,
        name,
        effect: currentEffect.name || 'anonymous',
        source,
        timestamp: Date.now()
      })
    }

    return value
  }

  const set = (next: T | ((prev: T) => T)) => {
    const from = value
    value = typeof next === 'function' ? (next as (prev: T) => T)(value) : next

    emit('signal:set', {
      id,
      name,
      from,
      to: value,
      source,
      timestamp: Date.now()
    })

    for (const fn of subscribers) {
      fn()
    }
  }

  const subscribe = (fn: () => void) => {
    subscribers.add(fn)
    emit('signal:sub', {
      id,
      name,
      effect: fn.name || 'anonymous',
      source,
      timestamp: Date.now()
    })
    return () => {
      subscribers.delete(fn)
      emit('signal:unsub', {
        id,
        name,
        effect: fn.name || 'anonymous',
        source,
        timestamp: Date.now()
      })
    }
  }

  return [get, set, subscribe]
}

export function effect(fn: Effect) {
  currentEffect = fn
  fn()
  currentEffect = null
}

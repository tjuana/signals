import { useState, useEffect, useRef } from 'react'
import { createSignal, effect } from './createSignal'

/**
 * A bridge between fine-grained signal reactivity and React state.
 * Triggers React re-render when the signal updates.
 */

export function useStateSignal<T>(initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const signalRef = useRef<ReturnType<typeof createSignal<T>>>(null)

  if (!signalRef.current) {
    signalRef.current = createSignal(initial)
  }

  const [get, set] = signalRef.current
  const [reactState, setReactState] = useState(get())

  useEffect(() => {
    effect(() => {
      setReactState(get())
    })
  }, [])

  return [reactState, set]
}

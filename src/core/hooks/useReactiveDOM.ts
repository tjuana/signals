import { useEffect } from 'react'
import { effect } from '../signal/createSignal'

export function useReactiveDOM<T>(
  ref: React.RefObject<HTMLElement | null>,
  signal: { value: T }
) {
  useEffect(() => {
    return effect(() => {
      if (ref.current) {
        ref.current.textContent = String(signal.value)
      }
    })
  }, [ref])
}
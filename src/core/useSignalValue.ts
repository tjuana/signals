import { useEffect, useState } from 'react'
import { effect } from './createSignal'

export function useSignalValue<T>(signal: { value: T }): T {
  const [state, setState] = useState(signal.value)

  useEffect(() => {
    return effect(() => {
      setState(signal.value)
    })
  }, [])

  return state
}

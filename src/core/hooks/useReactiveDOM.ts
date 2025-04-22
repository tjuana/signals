import { useEffect } from 'react'
import { effect } from '../signal/createSignal'

export const useReactiveDOM = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  signal: { value: any }
) => {
  useEffect(() => {
    return effect(() => {
      if (ref.current) {
        // автоматическая реакция в зависимости от элемента
        if ('value' in ref.current) {
          (ref.current as any).value = signal.value
        } else {
          ref.current.textContent = String(signal.value ?? '')
        }
      }
    })
  }, [ref])
}
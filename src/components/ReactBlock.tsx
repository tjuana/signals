import { useRef, useEffect } from 'react'
import { createSignal, effect } from '@/core/createSignal'

const [count, setCount] = createSignal(0)

export const SignalBlock = () => {
  const valueRef = useRef<HTMLParagraphElement>(null)
  const renders = useRef(0)
  renders.current += 1

  useEffect(() => {
    effect(() => {
      if (valueRef.current) {
        valueRef.current.textContent = String(count())
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <h2 className="text-2xl font-bold text-blue-400">🧠 Signal State</h2>
      <p ref={valueRef} className="text-5xl font-mono">0</p>
      <button
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        onClick={() => setCount(prev => prev + 1)}
      >
        Increment
      </button>
      <p className="text-sm text-gray-400">Renders: {renders.current}</p>
    </div>
  )
}
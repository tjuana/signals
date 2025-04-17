import { useRef } from 'react'
import { createSignalObject } from '@/core/signal/createSignalObject'
import { useReactiveDOM } from '@/core/hooks/useReactiveDOM'
import { RenderCount } from './ui/RenderCount'
import { Button } from './ui/Button'
import { Title } from './ui/Title'
import { Card } from './ui/Card'
// import { useSignalValue } from '@/core/useSignalValue' // альтернатива

const count = createSignalObject(0)

export const SignalBlock = () => {
  const valueRef = useRef<HTMLParagraphElement>(null)

  // 🧠 Прямой сигнал → DOM
  useReactiveDOM(valueRef, count)

  // ✅ Альтернатива:
  // const countValue = useSignalValue(count)

  return (
    <Card variant="accent" size="md" className="bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center space-y-4 shadow-md">
      <Title as="h2">🧠 Signal State</Title>
      <p ref={valueRef} className="text-5xl font-mono">0</p>
      <Button size="md" variant="primary" onClick={() => count.set(p => p + 1)}>
        Increment
      </Button>
      <RenderCount />
    </Card>
  )
}
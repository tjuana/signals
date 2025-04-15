import { useState } from "react"
import { Card } from "./ui/Card"
import { RenderCount } from "./ui/RenderCount"
import { Title } from './ui/Title'
import { Button } from './ui/Button'

export const ReactBlock = () => {
  const [count, setCount] = useState(0)

  return (
    <Card variant="accent" size="md" className="bg-gray-800 p-6 rounded-xl flex flex-col items-center text-center space-y-4 shadow-md">
      <Title as="h2">⚛ React useState</Title>
      <p className="text-5xl font-mono">{count}</p>
      <Button size="md" variant="primary" onClick={() => setCount(prev => prev + 1)}>
        Increment
      </Button>
    <RenderCount />
  </Card>
  )
}
import { useState, useRef } from "react"

export const ReactBlock = () => {
  const [count, setCount] = useState(0)
  const renders = useRef(0)
  renders.current += 1

  return (
    <div className="bg-pink-800 p-6 rounded-xl flex flex-col items-center text-center space-y-4 shadow-md">
      <h2 className="text-xl font-bold text-pink-200">⚛ React useState</h2>
      <div className="text-5xl font-mono">{count}</div>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-white"
      >
        Increment
      </button>
      <p className="text-gray-200 text-sm">renders: {renders.current}</p>
    </div>
  )
}
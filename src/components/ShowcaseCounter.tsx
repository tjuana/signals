import { SignalBlock } from "./ReactBlock"
import { ReactBlock } from "./SignalBlock"

export const ShowcaseCounter = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 p-10 rounded-xl text-white max-w-5xl mx-auto">
      <SignalBlock />
      <ReactBlock />
    </div>
  )
}
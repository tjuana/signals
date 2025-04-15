import { SignalBlock } from "./SignalBlock"
import { ReactBlock } from "./ReactBlock"

export const ShowcaseCounter = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-900 p-10 rounded-xl text-white max-w-5xl mx-auto">
      <SignalBlock />
      <ReactBlock />
    </div>
  )
}
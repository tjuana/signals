import { devLogTree } from '@/core/dev/logger/logTree'

export const DevLogPanel = () => {
  return (
    <div className="p-4 text-sm bg-gray-500 text-white overflow-auto max-h-[80vh] rounded shadow-xl">
      {[...devLogTree.entries()].map(([source, group]) => (
        <div key={source}>
          <h2 className="font-bold text-yellow-400">{source}</h2>
          {Object.entries(group.signals).map(([signalId, events]) => (
            <details key={signalId} className="ml-4 mb-2">
              <summary className="text-blue-300">{signalId}</summary>
              <ul className="ml-4">
                {events.map((e, idx) => (
                  <li key={idx} className="text-gray-300">
                    {e.type} {e.payload !== undefined && `→ ${JSON.stringify(e.payload)}`}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      ))}
    </div>
  )
}
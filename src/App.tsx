import { ShowcaseCounter } from '@/components/ShowcaseCounter'
import { ShowcaseProfileForm } from './components/ShowcaseForm'
import { DevLogPanel } from './components/log/DevLogPanel'

const App = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <ShowcaseCounter />
      </div>
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <ShowcaseProfileForm />
      </div>
      <DevLogPanel />
    </>
  )
}

export default App
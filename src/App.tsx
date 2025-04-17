import { ShowcaseCounter } from '@/components/ShowcaseCounter'
import { ShowcaseProfileForm } from './components/ShowcaseForm'

const App = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <ShowcaseCounter />
      </div>
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <ShowcaseProfileForm />
      </div>
    </>
  )
}

export default App
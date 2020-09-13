import React, { FC, lazy } from 'react'

const LazyComponent = lazy(() => import('./components/Lazy/Lazy'))

const App: FC = () => {
  return (
    <div>
      <React.Suspense fallback={<h1>Loading</h1>}>
        <LazyComponent />
      </React.Suspense>
    </div>
  )
}

export default App
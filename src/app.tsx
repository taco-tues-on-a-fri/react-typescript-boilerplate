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



//|------------------------------------------------------------------------
// import * as React from 'react';
// import { hot } from 'react-hot-loader/root';

// // import './app.scss';

// interface Props {
// 	readonly component: React.ComponentType;
// 	readonly [x: string]: any;
// }

// export const App = hot(() => (
//     <div>🌮taco-tues-on-a-fri</div>
// ))
//|------------------------------------------------------------------------
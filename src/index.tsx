import React from 'react'
import { render } from 'react-dom'

import App from './app'

// const node: HTMLElement | null = document.getElementById('root') || document.createElement('div')

// const renderRoot = (Ap: JSX.Element): void => render(app, node)

// const router = (Application: any): JSX.Element => (
  // <Application />
// )

// renderRoot(router(App));

render(<App />, document.getElementById('root'))

//|------------------------------------------------------------------------v1
// import React from 'react'
// import { render } from 'react-dom'

// import { App } from './app'

// const node: HTMLElement | null = document.getElementById('app') || document.createElement('div')

// const renderRoot = (app: JSX.Element): void => render(app, node)

// const router = (Application: any): JSX.Element => (
//   <Application />
// )

// renderRoot(router(App));

// if (module.hot) {
// 	module.hot.accept();

// 	// eslint-disable-next-line
// 	renderRoot(router(require('./app').App));
// }

// if (process.env.NODE_ENV === 'production') {
// 	install({
// 		onUpdateReady: () => applyUpdate(),
// 		onUpdated: () => window.location.reload()
// 	});
// }
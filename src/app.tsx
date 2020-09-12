import * as React from 'react';
import { hot } from 'react-hot-loader/root';

// import './app.scss';

interface Props {
	readonly component: React.ComponentType;
	readonly [x: string]: any;
}

export const App = hot(() => (
    <div>🌮taco-tues-on-a-fri</div>
))

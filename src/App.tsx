import { BrowserRouter } from 'react-router-dom';

import { Routing } from './routing';

import './styles/index.scss';

export const App = () => (
	<BrowserRouter>
		<Routing />
	</BrowserRouter>
);

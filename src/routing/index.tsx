import { Route, Routes } from 'react-router-dom';

import { Home } from '@src/components/Home';
import { CreateHero } from '@src/components/CreateHero/CreateHero';

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<CreateHero />} />
		</Routes>
	);
};

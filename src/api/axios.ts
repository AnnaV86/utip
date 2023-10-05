import initAxios from 'axios';

export const axios = initAxios.create({
	baseURL: `${'https://swapi.dev'}/`,
});

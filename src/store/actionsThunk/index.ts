import { Dispatch } from 'redux';
import { isFetching, setError, setPeople } from '../reducers/people';
import { axios } from '@src/api/axios';
import { IPeople } from '@src/models';

export function getPeople() {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(setError(''));
			dispatch(isFetching(true));

			const res = await axios.get('api/people/');
			if (res?.data.results.length) {
				/** увеличение массива для пагинации*/
				const normalizedRes = [
					...(res?.data.results || []),
					...(res?.data.results.map((el: IPeople) => ({ ...el, name: `${el.name}1` })) || []),
					...(res?.data.results.map((el: IPeople) => ({ ...el, name: `${el.name}2` })) || []),
				];
				localStorage.setItem('people', JSON.stringify(normalizedRes));

				dispatch(setPeople(normalizedRes));
			}
		} catch (e) {
			dispatch(setError('Что-то пошло не так...'));
		} finally {
			dispatch(isFetching(false));
		}
	};
}

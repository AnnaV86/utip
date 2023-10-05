import { IPeople } from '@src/models';
import { removeHero } from '@src/store/reducers/people';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

type UseSortPeople = (props: { deletingHero: (name: string) => void; people: IPeople[] }) => {
	sortPeople: IPeople[];
	sortingPeople: (peopleList: IPeople[]) => void;
	setSortPeople: React.Dispatch<React.SetStateAction<IPeople[]>>;
	onClickDeletePeopleHero: (name: string) => void;
};
export const useSortPeople: UseSortPeople = ({ deletingHero, people }) => {
	const dispatch = useDispatch();
	const [sortPeople, setSortPeople] = useState<IPeople[]>([]);

	const sortingPeople = useCallback((peopleList: IPeople[]) => setSortPeople(peopleList), []);

	const onClickDeletePeopleHero = (name: string) => {
		setSortPeople((prev) => prev.filter((hero) => hero.name !== name));
		const filteredPeople = people.filter((hero) => hero.name !== name);
		localStorage.setItem('people', JSON.stringify(filteredPeople));
		dispatch(removeHero(name));
		deletingHero('');
	};

	return {
		sortPeople,
		sortingPeople,
		setSortPeople,
		onClickDeletePeopleHero,
	};
};

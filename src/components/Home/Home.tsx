import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '@src/utils/useSelector';
import { usePagination } from '@src/utils/usePagination';
import { getPeople } from '@src/store/actionsThunk';
import { deletePeople, setError, setPeople } from '@src/store/reducers/people';
import { Preloader } from '../Preloader';
import { ModalAccept } from '../ModalAccept';
import { HeroIcon, StarWarsIcon } from '@src/assets/icons';

import styles from './Home.module.scss';
import { useDeleteHero } from './hooks/useDeleteHero';
import { useSortPeople } from './hooks/useSortPeople';
import { PeopleInfo } from './components/PeopleInfo';

export const Home: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { people, isFetching, error } = useSelector((state) => state.people);
	const { deletedHero, deletingHero, onCloseModal } = useDeleteHero();
	const { sortPeople, sortingPeople, setSortPeople, onClickDeletePeopleHero } = useSortPeople({ deletingHero, people });
	const { getList, list, activePage, setActivePage } = usePagination({ initList: sortPeople });

	const navigateCreate = () => {
		navigate('/create');
	};

	const getData = async () => {
		delete localStorage.people;
		setActivePage(1);
		sortingPeople([]);
		dispatch(getPeople());
	};

	const clearData = () => {
		delete localStorage.people;
		setActivePage(1);
		dispatch(deletePeople());
	};

	useEffect(() => {
		const savedPeople = localStorage.getItem('people');
		if (savedPeople) {
			dispatch(setPeople(JSON.parse(savedPeople)));
		}
	}, []);

	useEffect(() => {
		if (!sortPeople.length) {
			sortingPeople(people);
		}
	}, [people]);

	useEffect(() => {
		let id: NodeJS.Timeout;
		if (error) {
			(id = setTimeout(() => dispatch(setError('')))), 8000;
		}

		return () => clearTimeout(id);
	}, [error]);

	return (
		<div className={styles.container}>
			<ModalAccept deletedHero={deletedHero} onClose={onCloseModal} accept={onClickDeletePeopleHero} />
			<div className={styles.buttonsWrap}>
				<button type="button" className={styles.button} onClick={getData}>
					Загрузить данные
					{!people.length && !isFetching && <span className={styles.flare}></span>}
				</button>
				<button type="button" className={styles.button} onClick={clearData}>
					Очистить данные
				</button>
				<button type="button" className={styles.createButton} onClick={navigateCreate}>
					<HeroIcon />
				</button>
			</div>
			<StarWarsIcon height={250} width={250} />
			{isFetching ? (
				<Preloader />
			) : (
				<PeopleInfo
					activePage={activePage}
					getList={getList}
					list={list}
					deletingHero={deletingHero}
					setSortPeople={setSortPeople}
					sortPeople={sortPeople}
				/>
			)}
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

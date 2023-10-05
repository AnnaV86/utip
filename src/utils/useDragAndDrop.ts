import { IPeople } from '@src/models';
import { setPeople } from '@src/store/reducers/people';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export const heroTransfer = (targetItem: IPeople, list: IPeople[], movedItem?: IPeople) => {
	if (!movedItem) return list;

	const newList = [...list];
	const movingItemIndex = newList.findIndex((hero: IPeople) => hero.name === movedItem.name);
	const targetItemIndex = newList.findIndex((hero: IPeople) => hero.name === targetItem.name);

	newList.splice(movingItemIndex, 1);

	if (movingItemIndex > targetItemIndex) {
		newList.splice(targetItemIndex + 1, 0, movedItem);
	} else {
		newList.splice(targetItemIndex, 0, movedItem);
	}

	return newList;
};

type useDragAndDropType = (props: {
	people: IPeople[];
	setSortPeople: React.Dispatch<React.SetStateAction<IPeople[]>>;
}) => {
	dragStartHandler: (e: React.DragEvent<HTMLTableRowElement>, item: IPeople) => void;
	dragEndHandler: (e: React.DragEvent<HTMLTableRowElement>) => void;
	dragLeaveHandler: (e: React.DragEvent<HTMLTableRowElement>) => void;
	dragOverHandler: (e: React.DragEvent<HTMLTableRowElement>) => void;
	dropHandler: (e: React.DragEvent<HTMLTableRowElement>, item: IPeople) => void;
};

export const useDragAndDrop: useDragAndDropType = ({ people, setSortPeople }) => {
	const [currentHero, setCurrentHero] = useState<IPeople>();
	const dispatch = useDispatch();

	const dragStartHandler = (e: React.DragEvent<HTMLTableRowElement>, item: IPeople) => {
		setCurrentHero(item);
	};

	const dragEndHandler = (e: React.DragEvent<HTMLTableRowElement>) => {
		if (e.target instanceof HTMLElement) {
			e.target.style.background = 'rgb(255, 255, 255)';
		}
	};
	const dragLeaveHandler = (e: React.DragEvent<HTMLTableRowElement>) => {
		if (e.target instanceof HTMLElement) {
			e.target.style.background = 'rgb(255, 255, 255)';
		}
	};

	const dragOverHandler = (e: React.DragEvent<HTMLTableRowElement>) => {
		e.preventDefault();
		if (e.target instanceof HTMLElement) {
			e.target.style.background = 'blueviolet';
		}
	};

	const dropHandler = (e: React.DragEvent<HTMLTableRowElement>, item: IPeople) => {
		e.preventDefault();
		const newPeople = heroTransfer(item, people, currentHero);
		setSortPeople(newPeople);
		localStorage.setItem('people', JSON.stringify(newPeople));
		dispatch(setPeople(newPeople));

		if (e.target instanceof HTMLElement) {
			e.target.style.background = 'rgb(255, 255, 255)';
		}
	};

	return { dragStartHandler, dragEndHandler, dragLeaveHandler, dragOverHandler, dropHandler };
};

import { useEffect, useState } from 'react';
import { IPeople } from '@src/models';

type usePaginationType = (props: { initList: IPeople[] }) => {
	getList: (page: number) => void;
	list: IPeople[];
	activePage: number;
	setActivePage: React.Dispatch<React.SetStateAction<number>>;
};

const LIMIT_LOTS = 10;

const initData = (list: IPeople[]) => list.slice(0, 10);

export const usePagination: usePaginationType = ({ initList }) => {
	const [list, setList] = useState(() => initData(initList));
	const [activePage, setActivePage] = useState(1);

	const arraySlice = (arr: IPeople[], num: number) => arr.slice((num - 1) * LIMIT_LOTS, num * LIMIT_LOTS);

	const getList = (page: number) => {
		const newList = arraySlice(initList, page);
		setList(newList);
		setActivePage(page);
	};

	useEffect(() => {
		if (initList.length) {
			const initSlice = arraySlice(initList, activePage);
			setList(initSlice);
		}
	}, [initList]);

	return { getList, list, activePage, setActivePage };
};

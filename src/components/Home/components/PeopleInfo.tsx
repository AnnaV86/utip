import { CrossIcon } from '@src/assets/icons';
import { Pagination } from '@src/components/Pagination';
import { IPeople } from '@src/models';
import { useDragAndDrop } from '@src/utils/useDragAndDrop';
import { useSelector } from '@src/utils/useSelector';
import React, { FC } from 'react';

import styles from './peopleInfo.module.scss';

type PeopleInfoProps = {
	deletingHero: (name: string) => void;
	activePage: number;
	getList: (page: number) => void;
	list: IPeople[];
	sortPeople: IPeople[];
	setSortPeople: React.Dispatch<React.SetStateAction<IPeople[]>>;
};
export const PeopleInfo: FC<PeopleInfoProps> = ({
	deletingHero,
	list,
	activePage,
	getList,
	setSortPeople,
	sortPeople,
}) => {
	const { people } = useSelector((state) => state.people);

	const { dragStartHandler, dragEndHandler, dragLeaveHandler, dragOverHandler, dropHandler } = useDragAndDrop({
		people: sortPeople,
		setSortPeople,
	});

	if (!people.length) {
		return <strong>Информация отстутствует, пожалуйста, загрузите данные</strong>;
	}

	const onClickSort = (type: keyof IPeople) => {
		let sortArray: IPeople[];
		if (type === 'height' || type === 'mass') {
			sortArray = [...people].sort((a, b) => Number(a[type]) - Number(b[type]));
		} else {
			sortArray = [...people].sort((a, b) => a[type].localeCompare(b[type]));
		}
		setSortPeople(sortArray);
	};

	return (
		<table className={styles.tableWrapper}>
			<thead>
				<tr>
					<th onClick={() => onClickSort('name')}>Name</th>
					<th onClick={() => onClickSort('birth_year')}>Year of birth</th>
					<th onClick={() => onClickSort('gender')}>Gender</th>
					<th onClick={() => onClickSort('height')}>Height</th>
					<th onClick={() => onClickSort('mass')}>Mass</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{list.map((item) => (
					<tr
						key={item.name}
						draggable={true}
						onDragStart={(e) => dragStartHandler(e, item)}
						onDragEnd={dragEndHandler}
						onDragOver={dragOverHandler}
						onDragLeave={dragLeaveHandler}
						onDrop={(e) => dropHandler(e, item)}
					>
						<td>{item.name}</td>
						<td>{item.birth_year}</td>
						<td>{item.gender}</td>
						<td>{item.height}</td>
						<td>{item.mass}</td>
						<td>
							<button type="button" className={styles.crossButton} onClick={() => deletingHero(item.name)}>
								<CrossIcon />
							</button>
						</td>
					</tr>
				))}
			</tbody>
			{people.length > 10 && (
				<tfoot>
					<tr>
						<td colSpan={6}>
							<Pagination activePage={activePage} pageCount={Math.ceil(people.length / 10)} onChange={getList} />
						</td>
					</tr>
				</tfoot>
			)}
		</table>
	);
};

import { FC } from 'react';

import styles from './styles.module.scss';

interface IPagination {
	pageCount: number;
	activePage: number;
	onChange: (value: number) => void;
}

export const Pagination: FC<IPagination> = ({ activePage = 1, onChange, pageCount }) => {
	const pageArray = () =>
		Array(pageCount)
			.fill(1)
			.map((_, i) => i + 1);

	const onClickPageNumber = (pageNumber: number | null) => {
		if (pageNumber && onChange) {
			onChange(pageNumber);
		}
	};

	return (
		<div className={styles.wrapperPagination}>
			{pageArray().map((pageNumber, index) => (
				<button
					key={index}
					className={`${styles.page} ${activePage === pageNumber && styles.active}`}
					onClick={() => onClickPageNumber(index + 1)}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
};

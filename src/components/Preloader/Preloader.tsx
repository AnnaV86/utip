import React, { FC } from 'react';

import style from './preloader.module.scss';

export const Preloader: FC = () => {
	return (
		<div className={style.preloader}>
			<div className={style.container}>
				<span className={style.round}></span>
			</div>
		</div>
	);
};

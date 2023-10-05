import { useCallback, useState } from 'react';

type UseDeleteHero = () => {
	deletedHero: string;
	deletingHero: (name: string) => void;
	onCloseModal: () => void;
};
export const useDeleteHero: UseDeleteHero = () => {
	const [deletedHero, setDeletedHero] = useState('');

	const deletingHero = useCallback((name: string) => setDeletedHero(name), []);

	const onCloseModal = useCallback(() => {
		deletingHero('');
	}, []);

	return {
		deletedHero,
		deletingHero,
		onCloseModal,
	};
};

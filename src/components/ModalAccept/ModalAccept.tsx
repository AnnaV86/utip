import styles from './ModalAccept.module.scss';

interface Props {
	deletedHero: string;
	onClose: () => void;
	accept: (name: string) => void;
}

export const ModalAccept = ({ deletedHero, onClose, accept }: Props) => {
	if (!deletedHero) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div className={styles.wrapper}>
					<div className={styles.container}>
						<p className={styles.text}>{`Вы уверены, что хотите удалить ${deletedHero}?`}</p>
						<div className={styles.buttonsWrap}>
							<button className={styles.button} onClick={() => accept(deletedHero)}>
								Да, удалить
							</button>
							<button className={styles.buttonCancel} onClick={onClose}>
								Отмена
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

import { FC, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	classNameWrapper?: string | undefined;
	label?: string;
	error?: string;
	touched?: boolean;
	classNameError?: string | undefined;
}

export const Input: FC<InputProps> = ({ classNameWrapper, label, error, touched, classNameError, ...props }) => {
	return (
		<div className={`${styles.inputWrapper} ${classNameWrapper ? classNameWrapper : ''}`}>
			{label && <label className={styles.label}>{label}</label>}
			<input className={`${styles.input} ${error && touched ? styles.inputError : ''}`} {...props} />
			{error && touched && <p className={`${classNameError ? classNameError : styles.error}`}>{error}</p>}
		</div>
	);
};

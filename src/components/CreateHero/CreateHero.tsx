import { FC } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '@src/utils/useSelector';
import { createHero } from '@src/store/reducers/people';
import { IPeople } from '@src/models';
import { Input } from '../Input';
import { HeroNewIcon, StarWarsIcon } from '@src/assets/icons';

import styles from './CreateHero.module.scss';

const validationSchema = yup.object().shape({
	name: yup.string().required('Required field'),
	birth_year: yup.string().required('Required field'),
	gender: yup.string().required('Required field'),
	height: yup.string().required('Required field'),
	mass: yup.string().required('Required field'),
});

export const CreateHero: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { people } = useSelector((state) => state.people);

	const saveHero = (values: IPeople) => {
		dispatch(createHero(values));
		localStorage.setItem('people', JSON.stringify(people.concat(values)));
		navigate('/');
	};

	const navigateMain = () => {
		navigate('/');
	};

	return (
		<>
			<div className={styles.icon} onClick={navigateMain}>
				<StarWarsIcon height={100} width={100} />
			</div>
			<div className={styles.container}>
				<HeroNewIcon />
				<h1>Создай своего персонажа</h1>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						name: '',
						birth_year: '',
						gender: '',
						height: '',
						mass: '',
					}}
					onSubmit={saveHero}
				>
					{({ handleSubmit, handleChange, handleBlur, errors, touched, values, isValid }) => (
						<Form onSubmit={handleSubmit}>
							<div className={styles.fields}>
								<Input
									label="Имя персонажа"
									type="text"
									name="name"
									value={values.name}
									error={errors.name}
									touched={touched.name}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									autoComplete="false"
								/>
								<Input
									label="Год рождения"
									type="text"
									name="birth_year"
									value={values.birth_year}
									error={errors.birth_year}
									touched={touched.birth_year}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<Input
									label="Гендер"
									type="text"
									name="gender"
									value={values.gender}
									error={errors.gender}
									touched={touched.gender}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<Input
									label="Рост"
									type="string"
									name="height"
									value={values.height}
									error={errors.height}
									touched={touched.height}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<Input
									label="Вес"
									type="string"
									name="mass"
									value={values.mass}
									error={errors.mass}
									touched={touched.mass}
									onChange={handleChange}
									onBlur={handleBlur}
									required
								/>
								<button
									className={`${styles.button} ${!isValid && styles.buttonDisabled}`}
									type="submit"
									disabled={!isValid}
								>
									Сохранить
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};

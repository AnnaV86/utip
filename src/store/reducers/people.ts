import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPeople } from '@src/models';

export interface IPeopleState {
	people: IPeople[];
	isFetching: boolean;
	error: string;
}

const initialState: IPeopleState = {
	people: [],
	isFetching: false,
	error: '',
};

const peopleSlice = createSlice({
	name: 'people',
	initialState,
	reducers: {
		setPeople: (state, action: PayloadAction<IPeople[]>) => {
			state.people = action.payload;
		},
		deletePeople: (state) => {
			state.people = [];
		},
		createHero: (state, action: PayloadAction<IPeople>) => {
			state.people = state.people.concat(action.payload);
		},
		removeHero: (state, action: PayloadAction<string>) => {
			state.people = state.people.filter((hero) => hero.name !== action.payload);
		},
		isFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setPeople, deletePeople, removeHero, isFetching, setError, createHero } = peopleSlice.actions;
export default peopleSlice.reducer;

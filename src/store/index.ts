import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import peopleReducer from './reducers/people';

const store = configureStore({
	reducer: {
		people: peopleReducer,
	},
	middleware: [thunk],
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

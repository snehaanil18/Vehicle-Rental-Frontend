import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './Slices/index'; // Assuming you'll create slices here

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
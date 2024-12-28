import { configureStore } from '@reduxjs/toolkit';
import graphqlReducer from './slices/graphqlSlice';

export const store = configureStore({
  reducer: {
    graphql: graphqlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
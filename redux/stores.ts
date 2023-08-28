import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { IUser, ISearch, IPropertyState } from '../models/types';
import { usersSlice, propertySlice, searchSlice } from './slices';

export interface AppStore {
  users: IUser[];
  propertys: IPropertyState
  search: ISearch
}

export const store = configureStore<AppStore>({
  reducer: {
    users: usersSlice.reducer,
    propertys: propertySlice.reducer,
    search: searchSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
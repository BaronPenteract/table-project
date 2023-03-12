import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import TableItemsSlice from './slices/TableItemsSlice'

const store = configureStore({
  reducer: {
    table: TableItemsSlice,
  },
})
export default store;

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { paginateData } from "../../utils/utils";
import { RootState } from "../store";

 export type TableItemType = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TableItemsInterface {
  items: TableItemType[];
  itemsArrays: TableItemType[][];
  currentPage: number;
  pageSize: number;
  pages: number;
  currentItems: TableItemType[];
  status: 'loading' | 'success' | 'error'
}

export const fetchTableItems = createAsyncThunk<TableItemType[]>("table/fetchTableItems", async (_, ThunkAPI) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');

  if (data.length > 0) {
    return data;
  } else {
    ThunkAPI.rejectWithValue("Что-то пошло не так");
  }
})

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: TableItemsInterface = {
  items: [],
  itemsArrays: [],
  currentPage: 0,
  pageSize: 10,
  pages: 1,
  currentItems: [],
  status: Status.LOADING
}

export const TableItemsSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TableItemType[]>) => {
      state.items = action.payload;

      const { pages, currentItems } = paginateData(state.items, state.pageSize);

      state.pages = pages;
      state.itemsArrays = currentItems;
      state.currentItems = state.itemsArrays[state.currentPage];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.currentItems = state.itemsArrays[state.currentPage];
    }, 
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTableItems.pending, (state)=> {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchTableItems.fulfilled, (state, action)=> {
      state.status = Status.SUCCESS;
      state.items = action.payload;

      const { pages, currentItems } = paginateData(state.items, state.pageSize);

      state.pages = pages;
      state.itemsArrays = currentItems;
      state.currentItems = state.itemsArrays[state.currentPage];
    })
    builder.addCase(fetchTableItems.rejected, (state, action)=> {
      state.status = Status.ERROR;
    })
  }
})

export const getTableItemsSelector = (state: RootState) => state.table;

export const { setItems, setCurrentPage } = TableItemsSlice.actions;

export default TableItemsSlice.reducer;
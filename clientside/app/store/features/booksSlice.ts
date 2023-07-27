"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {AppState} from "./store";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export interface bookProps {
  id: number;
  title: string;
  desc: string;
  cover: string;
}

export interface BookState {
  loading: boolean;
  books: bookProps[];
  err: string | null | undefined;
}

const initialState: BookState = {
  loading: false,
  books: [],
  err: "",
};

export const fetchbooks = createAsyncThunk<any>("users/getBooks", () => {
  return axios
    .get<bookProps>("http://localhost:7000/books")
    .then((response: any) => response.data);
});

export const createbooks = createAsyncThunk<any>(
  "users/createBooks", 
  async (bookData,{rejectWithValue}) => {
   try {
    const response = await axios.post<bookProps>("http://localhost:7000/books",bookData);
    return response.data;
   } catch (error:any) {
    return rejectWithValue(error.response.data);
   }
});


export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchbooks.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(createbooks.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
        state.books.push(action.payload);
      })
      .addCase(createbooks.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.books = []
      })
      .addCase(fetchbooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.err = null;
      })
      .addCase(fetchbooks.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(fetchbooks.rejected, (state, action) => {
        state.loading = false;
        state.books = [];
        state.err =
          action.error.message ??
          `Error in fetching books + ${action.error.message}`;
      });
  },
});

export default bookSlice.reducer

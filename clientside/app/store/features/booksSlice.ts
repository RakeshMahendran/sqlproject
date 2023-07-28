"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {AppState} from "./store";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

export interface bookProps {
  id: number;
  title: string;
  description: string;
  cover: string;
}

export interface BookState {
  loading: boolean;
  books: bookProps[] | any;
  err: string | null | undefined;
}

interface BookFormData {
  title: string;
  description: string;
  cover: string;
  id: number;
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

export const createbooks = createAsyncThunk<bookProps, BookFormData>(
  "users/createBooks",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await axios.post<bookProps>(
        "http://localhost:7000/books",
        bookData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatebooks = createAsyncThunk<bookProps, BookFormData>(
  "users/updateBooks",
  async (bookData, { rejectWithValue }) => {
    let bookId: any = bookData?.id;
    bookId = JSON.parse(bookId);
    console.log("bookId", bookId, typeof bookId, bookData);
    try {
      const response = await axios.put<bookProps>(
        `http://localhost:7000/books/${bookId}`,
        bookData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletebooks = createAsyncThunk<number, number>(
  "users/deleteBooks",
  async (bookId, { rejectWithValue }) => {
    console.log("bookId", bookId, typeof bookId);
    try {
      const response = await axios.delete<bookProps>(
        `http://localhost:7000/books/${bookId}`
      );
      return bookId; // Return the deleted bookId
    } catch (error: any) {
      // Handle rejections and return the error
      return rejectWithValue(error.response.data);
    }
  }
);


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
      .addCase(fetchbooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
        state.err = null;
      })
      .addCase(fetchbooks.rejected, (state, action) => {
        state.loading = false;
        state.books = [];
        state.err =
          action.error.message ??
          `Error in fetching books + ${action.error.message}`;
      })
      .addCase(createbooks.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(createbooks.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
        state.books.books.push(action.payload);
      })
      .addCase(createbooks.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.books = [];
      })
      .addCase(updatebooks.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(updatebooks.fulfilled, (state, action) => {
        state.loading = false;
        state.err = null;
        state.books.push(action.payload);
      })
      .addCase(updatebooks.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.books = [];
      })
      .addCase(deletebooks.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(deletebooks.fulfilled, (state, action) => {
        console.log("statee", state.books);
        state.loading = false;
        state.books = state.books.books.filter((book: any) => {
          return book.id !== action.payload;
        });
        state.err = null;
      })
      .addCase(deletebooks.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message;
        state.books = [];
      });
  },
});

export default bookSlice.reducer;

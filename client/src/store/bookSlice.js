import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("/books/fetchBooks", async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/books/latest`
    );
    console.log(res);
    return res.data.books;
  } catch (error) {
    throw new Error("Internal Error");
  }
});

const bookSlice = createSlice({
  name: "books",
  initialState: { books: [], status: "idle", error: null },
  reducers: {
    addBooks: (state, action) => {
      state.books.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "loaded";
      state.books = action.payload;
      state.error = null;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "loaded";
      state.error = action.error.message;
    });
  },
});

export const bookActions = bookSlice.actions;
export default bookSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("/user/fetchUser", async (token) => {
  if (token) {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.user;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  } else {
    throw new Error("Not Logged In");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.status = "loaded";
    },
    removeUser: (state, action) => {
      state.user = null;
    },
    setAuthor: (state, action) => {
      state.user.authorId = action.payload;
    },
    addBook: (state, action) => {
      state.user.authorId.books.push(action.payload);
    },
    addSavedBook: (state, action) => {
      state.user.savedBooks.push(action.payload);
    },
    removeSavedBook: (state, action) => {
      const remainingBooks = state.user.savedBooks.filter(
        (savedBook) => savedBook !== action.payload
      );
      state.user.savedBooks = remainingBooks;
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(fetchUser.pending, (state, action) => {
      state.status = "loading";
      state.user = null;
      state.error = null;
    });
    bulider.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "loaded";
      state.user = action.payload;
      state.error = null;
    });
    bulider.addCase(fetchUser.rejected, (state, action) => {
      state.status = "loaded";
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export const UserActions = userSlice.actions;
export default userSlice;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import bookSlice from "./bookSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    books: bookSlice.reducer,
  },
});

export default store;

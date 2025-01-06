import { configureStore } from "@reduxjs/toolkit";
import { chatsReducer } from "./chatsSlice";
import { filtersReducer } from "./filtersSlice";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    filters: filtersReducer,
  },
});

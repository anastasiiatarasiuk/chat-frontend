import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchChatsThunk,
  addChatThunk,
  deleteChatThunk,
  updateChatThunk,
} from "./operations.js";

const initialState = {
  items: [],
  isLoading: false,
  isError: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addChatThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((chat) => chat.id !== action.payload);
      })
      .addCase(updateChatThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (chat) => chat.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addMatcher(
        isAnyOf(
          fetchChatsThunk.pending,
          addChatThunk.pending,
          deleteChatThunk.pending,
          updateChatThunk.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchChatsThunk.rejected,
          addChatThunk.rejected,
          deleteChatThunk.rejected,
          updateChatThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchChatsThunk.fulfilled,
          addChatThunk.fulfilled,
          deleteChatThunk.fulfilled,
          updateChatThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const chatsReducer = chatsSlice.reducer;

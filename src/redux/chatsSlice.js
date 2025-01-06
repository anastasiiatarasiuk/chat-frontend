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
        state.items = action.payload.data;
      })
      .addCase(addChatThunk.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((chat) => chat._id !== action.payload);
      })
      .addCase(updateChatThunk.fulfilled, (state, action) => {
        state.items = state.items.map((chat) => {
          return chat._id === action.payload.data._id
            ? action.payload.data
            : chat;
        });
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

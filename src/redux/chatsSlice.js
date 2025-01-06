import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchChatsThunk,
  addChatThunk,
  deleteChatThunk,
  updateChatThunk,
  fetchChatByIdThunk,
  sendMessageThunk,
} from "./operations.js";

const initialState = {
  items: [],
  currentChat: null,
  messages: [],
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
      .addCase(fetchChatByIdThunk.fulfilled, (state, action) => {
        state.currentChat = action.payload.data;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.messages.push({
            text: action.payload,
          });
        }
      })
      .addMatcher(
        isAnyOf(
          fetchChatsThunk.pending,
          addChatThunk.pending,
          deleteChatThunk.pending,
          updateChatThunk.pending,
          fetchChatByIdThunk.pending,
          sendMessageThunk.pending
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
          updateChatThunk.rejected,
          fetchChatByIdThunk.rejected,
          sendMessageThunk.rejected
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
          updateChatThunk.fulfilled,
          fetchChatByIdThunk.fulfilled,
          sendMessageThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const chatsReducer = chatsSlice.reducer;

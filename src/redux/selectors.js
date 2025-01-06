import { createSelector } from "@reduxjs/toolkit";

export const selectChats = (state) => state.chats.items;

export const selectCurrentChat = (state) => state.chats.currentChat;

export const selectIsLoading = (state) => state.chats.isLoading;

export const selectIsError = (state) => state.chats.isError;

export const selectFilter = (state) => state.filters.filter;

export const selectFilteredChats = createSelector(
  [selectChats, selectFilter],

  (chats, filter) => {
    if (!filter.trim()) {
      return chats;
    }
    return chats.filter((chat) => {
      const firstNameMatch = chat.firstName
        .toLowerCase()
        .includes(filter.toLowerCase());
      const lastNameMatch = chat.lastName
        .toLowerCase()
        .includes(filter.toLowerCase());
      return firstNameMatch || lastNameMatch;
    });
  }
);

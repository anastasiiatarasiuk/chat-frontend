import { createSelector } from "@reduxjs/toolkit";

export const selectChats = (state) => state.chats.items;

export const selectIsLoading = (state) => state.chats.isLoading;

export const selectIsError = (state) => state.chats.isError;

export const selectFilter = (state) => state.filters.filter;

export const selectFilteredContacts = createSelector(
  [selectChats, selectFilter],

  (chats, filter) => {
    return chats.filter((chat) => {
      const firstNameMatch = chat.name
        .toLowerCase()
        .includes(filter.toLowerCase());
      const lastNameMatch = chat.lastName
        .toLowerCase()
        .includes(filter.toLowerCase());
      return firstNameMatch || lastNameMatch;
    });
  }
);

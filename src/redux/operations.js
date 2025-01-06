import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatsApi } from "../config/chatsApi";

export const fetchChatsThunk = createAsyncThunk(
  "chats/fetchAll",
  async (__, thunkAPI) => {
    try {
      const { data } = await chatsApi.get("chats");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addChatThunk = createAsyncThunk(
  "chats/addChat",
  async (chat, thunkAPI) => {
    try {
      const { data } = await chatsApi.post("chats", chat);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chats/deleteChat",
  async (id, thunkAPI) => {
    try {
      await chatsApi.delete(`chats/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateChatThunk = createAsyncThunk(
  "chats/updateChat",
  async ({ _id, updatedChat }, thunkAPI) => {
    try {
      const { data } = await chatsApi.patch(`chats/${_id}`, updatedChat);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

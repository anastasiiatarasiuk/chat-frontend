import axios from "axios";

export const chatsApi = axios.create({
  baseURL: "https://chat-backend-r0za.onrender.com/",
});

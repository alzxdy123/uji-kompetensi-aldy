import axios from "axios";

export const AXIOS_LOGIN = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

import axios from "axios";

export const AXIOS = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export const AXIOS_LOGIN = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

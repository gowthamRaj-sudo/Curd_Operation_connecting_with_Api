import axios from "axios";
const BaseUrl = "http://127.0.0.1:5000";
export const instance = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

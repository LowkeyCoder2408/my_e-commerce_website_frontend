import axios from "axios";

export const frontendEndpoint = "http://localhost:3000";
export const backendEndpoint = "http://localhost:9192";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

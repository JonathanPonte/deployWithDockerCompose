import axios from "axios";
import { getToken } from "./Auth";

const api = axios.create({
    baseURL: "http://localhost:81/back/api" 
});

// Responsável por pegar requisição e setar configurações.
api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {
    config.headers.token = "Bearer " + token;
  }
  return config;
});

// Responsável por responder requisição após configuração, sem isso a requisição não teria resposta visivel.
api.interceptors.response.use( async response => {
  return response;
}, error => {
  return Promise.reject(error);
});


export default api;
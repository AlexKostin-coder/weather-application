import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 1000,
});

const api = async (method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH', url: string) => {
  const res = await instance({
    method,
    url,
  });
  return res;
}

export default api;
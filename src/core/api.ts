import axios, { AxiosError } from "axios";


const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 1000,
});

const api = async (method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH', url: string) => {
  try {
    const res = await instance({
      method,
      url,
    });
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<any>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "something went wrong!" };
  }
}

export default api;
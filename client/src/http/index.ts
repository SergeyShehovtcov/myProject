import axios from "axios";
import { BASE_URL } from "src/utils/constants";

const $host = axios.create({
  baseURL: BASE_URL,
});

const $authHost = axios.create({
  baseURL: BASE_URL,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };

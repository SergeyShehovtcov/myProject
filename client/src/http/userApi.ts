import jwt_decode from "jwt-decode";
import { $authHost, $host } from "src/http/index";

export const registration = async (
  email: string,
  password: string,
): Promise<string> => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  const { data } = await $host.post("/api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data);
  return jwt_decode(data);
};

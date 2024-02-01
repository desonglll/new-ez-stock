import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});
export const getToken = async (username: string, password: string) => {
  try {
    const response = await instance.post("/api/token/", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchToken = async (username: string, password: string) => {
  return await getToken(username, password);
};

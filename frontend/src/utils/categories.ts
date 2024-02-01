import axios, { AxiosError } from "axios";
import { get_headers } from "./basic.ts";

export const getCategories = async () => {
  const instance = axios.create();

  try {
    const res = await instance.get(`api/categories/`, {
      headers: get_headers(),
    });
    if (res.status === 200) {
      return res.data.results;
    }
  } catch (err: any) {
    console.log(err as AxiosError);
    return err.response;
  }
};

import axios, { AxiosError } from "axios";
import { get_headers } from "./basic.ts";

export const getProductByPk = async (pk: number) => {
  const instance = axios.create();
  try {
    const response = await instance.get(`api/products/${pk}/`, {
      headers: get_headers(),
    });
    if (response.status === 200 && response.data.status === "success") {
      return response.data.data;
    }
  } catch (err: any) {
    console.log(err as AxiosError);
    return err.response;
  }
};

export const getProductAttributes = async () => {
  const instance = axios.create();

  try {
    const response = await instance.get(`api/product_attributes/`, {
      headers: get_headers(),
    });
    if (response.status === 200) {
      return response.data.results;
    }
  } catch (err: any) {
    console.log(err as AxiosError);
    return err.response;
  }
};
export const getProductInfo = async () => {
  const instance = axios.create();

  try {
    const response = await instance.get("api/product_info/", {
      headers: get_headers(),
    });
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    console.log(err as AxiosError);
    return err.response;
  }
};

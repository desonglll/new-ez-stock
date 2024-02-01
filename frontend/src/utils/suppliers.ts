import axios, { AxiosError } from "axios";
import { get_headers } from "./basic.ts";

export const getSuppliers = async () => {
  const instance = axios.create();

  try {
    const res = await instance.get(`api/suppliers/`, {
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

export const get_supplier_by_pk = async (pk: number) => {
  const instance = axios.create();
  try {
    const res = await instance.get(`api/suppliers/${pk}/`, {
      headers: get_headers(),
    });
    if (res.status === 200 && res.data.status === "success") {
      return res.data.data;
    }
  } catch (err: any) {
    console.log(err as AxiosError);
    return err.response;
  }
};

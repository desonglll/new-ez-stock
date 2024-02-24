import axios, {AxiosError} from "axios";
import {get_headers} from "./basic.ts";
import React from "react";

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

export const get_product_attributes = async () => {
    const instance = axios.create();
    try {
        const response = await instance.get(`api/products/product_attributes/`, {
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

export const get_product_attribute_by_pk = async (pk: number) => {
    const instance = axios.create()
    try {
        const res = await instance.get(`api/products/product_attributes/${pk}/`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const getProductInfo = async () => {
    const instance = axios.create();

    try {
        const response = await instance.get("api/product_info/", {
            headers: get_headers(),
        });
        return response.data;
    } catch (err: any) {
        console.log(err as AxiosError);
        return err.response;
    }
};

export const get_products = async (page: number, pageSize: number) => {
    const instance = axios.create();
    try {
        const response = await instance.get(`api/products/`, {
            params: {
                offset: (page - 1) * pageSize,
                limit: pageSize
            },
            headers: get_headers()
        })
        return response.data
    } catch (err: any) {
        console.log(err as AxiosError);
        return err.response
    }
}

export const delete_product_by_pk = async (pk: number) => {
    const instance = axios.create();
    try {
        const response = await instance.delete(`api/products/${pk}/`, {
            headers: get_headers(),
        });
        return response.data;
    } catch (err: any) {
        console.log(err as AxiosError);
        return err.response;
    }
}

export const delete_products = async (pk_list: React.Key[]) => {
    const instance = axios.create();
    try {
        const response = await instance.delete("api/products/delete/", {
            data: {delete_list: pk_list}, // 将数据放入 data 属性
            headers: get_headers(),
        })
        return response.data
    } catch (err: any) {
        console.log(err as AxiosError)
        return err.response
    }
}
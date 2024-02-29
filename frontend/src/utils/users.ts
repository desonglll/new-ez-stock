import axios from "axios";
import {get_headers} from "./basic.ts";

export const get_users = async () => {
    const instance = axios.create()
    try {
        const response = await instance.get("api/users/", {
            headers: get_headers()
        })
        return response.data
    } catch (e) {
        console.log(e)
    }
}
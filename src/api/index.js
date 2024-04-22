import axios from 'axios';
import { getSession } from 'next-auth/react';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const AxiosClient = () => {
const defaultOptions = {
baseURL,
};
const instance = axios.create(defaultOptions);

instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
    request.headers.Authorization = `Bearer ${session.jwt}`;
    }
    return request;
    });
    return instance;
    };
    export const api = AxiosClient();
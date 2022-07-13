import axios from './axios.interceptor';
import api from './api.util';

export const LOGIN_URL = `${api}/auth/login`;

export function login(username, password) {
    return axios.post(LOGIN_URL, { username, password });
}

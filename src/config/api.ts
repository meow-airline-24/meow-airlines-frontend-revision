import { count } from "console";
import { create } from "domain";

export const BASE_API_URL = process.env.PUBLIC_API_URL;

const AUTH = {
    login: `${BASE_API_URL}/auth/login`,
    refresh_access_token: `${BASE_API_URL}/auth/refresh_access_token`,
    logout: `${BASE_API_URL}/auth/logout`
}

const USER = {
    register: `${BASE_API_URL}/user/register`,
    info: `${BASE_API_URL}/user/info`,
    edit: `${BASE_API_URL}/user/edit`,
    change_password: `${BASE_API_URL}/user/change_password`,
    delete: `${BASE_API_URL}/user/delete`,
}

const FLIGHT = {
    search: `${BASE_API_URL}/flight/search`,
    flightId: (flightId: number | string) => `${BASE_API_URL}/flight/${flightId}`,
    create: `${BASE_API_URL}/flight/create`,
    edit: `${BASE_API_URL}/flight/edit`,
}

const BOOKING = {
    create: `${BASE_API_URL}/booking/create`,
    bookingId: (bookingId: number | string) => `${BASE_API_URL}/booking/${bookingId}`,
    history: `${BASE_API_URL}/booking/history`
}

const TICKET = {
    edit: `${BASE_API_URL}/ticket/edit`,
    public_search: `${BASE_API_URL}/ticket/public_search`,
    public_edit: `${BASE_API_URL}/ticket/public_edit`,
    search: `${BASE_API_URL}/ticket/search`,
    count: `${BASE_API_URL}/ticket/count`,
}

const AIRCRAFT = {
    create: `${BASE_API_URL}/aircraft/create`,
    edit: `${BASE_API_URL}/aircraft/edit`,
}

const POST = {
    create: `${BASE_API_URL}/post/create`,
    postId: (postId: number | string) => `${BASE_API_URL}/post/${postId}`,
    getAll: `${BASE_API_URL}/post/getall`,
}

export const API = {
    AUTH,
    USER,
    FLIGHT,
    BOOKING,
    TICKET,
    AIRCRAFT,
    POST
}
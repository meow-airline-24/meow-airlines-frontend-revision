'use client'

import { API } from "@/config/api";
import { Aircraft } from "@/interfaces/Aircraft";
import { AircraftModel } from "@/interfaces/AircraftModel";
import { Booking } from "@/interfaces/Booking";
import { Flight } from "@/interfaces/Flight";
import { Seat } from "@/interfaces/Seat";
import { Ticket } from "@/interfaces/Ticket";
import { User } from "@/interfaces/User";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // For decoding the JWT token
import { getAccessToken, setAccessToken } from "@/utils/cookieUtils"
import { use } from "react";

axios.defaults.withCredentials = true;

// Function to decode the token and check if it's expired
function isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    try {
        const res = await axios.get(API.AUTH.refresh_access_token);

        const { accessToken } = res.data;

        // Store the new access token in cookies or local storage
        setAccessToken(accessToken);
        return accessToken;
    } catch (err) {
        console.error("Failed to refresh access token", err);
        throw new Error("Unable to refresh access token");
    }
}

export async function processAccessToken(accessToken: string): Promise<string> {
    if (isTokenExpired(accessToken)) {
        const newAccessToken = await refreshAccessToken();
        return newAccessToken
    } else return accessToken
}

export async function register({ user, password }: { user: User, password: string }) {
    const res = await axios.post(
        API.USER.register,
        { email: user.email, password: password, name: user.name, gender: user.gender, dob: user.dob, id_type: user.id_type, id_number: user.id_number, country_code: user.country_code, phone: user.phone },
    );
    return
}

export async function login({ email, password }: { email: string, password: string }) {
    const res = await axios.post(
        API.AUTH.login,
        { email, password },
    );
    const { accessToken } = res.data;

    setAccessToken(accessToken);
    return
}

export async function getSelfInfo() {
    const accessToken = getAccessToken();
    const res = await axios.get(API.USER.info, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
}

// export async function getPublicInfo() {
//     const res = await axiosInstance.get(API.PUBLIC.info);
//     return res.data;
// }
'use client'

import { API } from "@/config/api";
import { Aircraft } from "@/interfaces/Aircraft";
import { AircraftModel } from "@/interfaces/AircraftModel";
import { Booking } from "@/interfaces/Booking";
import { Flight } from "@/interfaces/Flight";
import { Seat } from "@/interfaces/Seat";
import { Ticket } from "@/interfaces/Ticket";
import { User } from "@/interfaces/User";
import { Post } from "@/interfaces/Post";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // For decoding the JWT token
import { getAccessToken, setAccessToken, removeAccessToken } from "@/utils/cookieUtils"
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

export async function register(user: User, password: string) {
    const res = await axios.post(
        API.USER.register,
        { email: user.email, password: password, name: user.name, gender: user.gender, dob: user.dob, id_type: user.id_type, id_number: user.id_number, country_code: user.country_code, phone: user.phone },
    );
    return
}

export async function login(email: string, password: string) {
    const res = await axios.post(
        API.AUTH.login,
        { email, password },
    );
    const { accessToken } = res.data;

    setAccessToken(accessToken);
    return
}

export async function getSelfInfo() {
    const accessToken = await getAccessToken();
    const res = await axios.get(API.USER.info, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
}

export async function logout() {
    try {
        const res = await axios.get(API.AUTH.logout);
    } catch (err: any) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);
        } else {
            alert("An unexpected error occurred.");
        }
    }
    removeAccessToken();
    return
}

export async function editUser(user: User) {
    const accessToken = await getAccessToken();
    const res = await axios.post(API.USER.edit, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        email: user.email,
        name: user.name,
        gender: user.gender,
        id_type: user.id_type,
        id_number: user.id_number
    });
    return res.data;
}

export async function deleteUser() {
    const accessToken = await getAccessToken();
    const res = await axios.delete(API.USER.delete, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
}

export async function flightSearch(flight: any, number_people: number) {
    try {
        const res = await axios.post(API.FLIGHT.search, {
            departure_airport: flight.departure_airport,
            arrival_airport: flight.arrival_airport,
            departure_time: flight.departure_time,
            number_people: number_people
        });
        return res.data?.flights;
    } catch {
        return null;
    }
}

export async function getFlightById(id: string) {
    const res = await axios.get(API.FLIGHT.flightId(id));
    return res.data;
}

export async function getTicketCount() {
    const accessToken = await getAccessToken();
    const res = await axios.get(API.TICKET.count, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.data;
}

export async function createPost(title: any, content: any) {
    const accessToken = await getAccessToken();
    console.log(accessToken);

    const res = await axios.post(
        API.POST.create,
        { title, content },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return res.data;
}

export async function getPostById(postId: string) {
    const response = await axios.get(API.POST.postId(postId));
    const post: Post = response.data;
    return post;
}

export async function createBooking(input: any) {
    const accessToken = await getAccessToken();
    console.log(accessToken);

    const res = await axios.post(
        API.BOOKING.create,
        { input },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return res.data;
}
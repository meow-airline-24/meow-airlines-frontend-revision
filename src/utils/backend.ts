'use client';

import { API } from "@/config/api";
import { Aircraft } from "@/interfaces/Aircraft";
import { AircraftModel } from "@/interfaces/AircraftModel";
import { Booking } from "@/interfaces/Booking";
import { Flight } from "@/interfaces/Flight";
import { Seat } from "@/interfaces/Seat";
import { Ticket } from "@/interfaces/Ticket";
import { User } from "@/interfaces/User";
import axios from "axios";

export async function login({ email, password }: { email: string, password: string }) {
    const res = await axios.post(
        API.AUTH.login,
        { email, password },
    );
    const { accessToken } = res.data;
    return { accessToken }
}
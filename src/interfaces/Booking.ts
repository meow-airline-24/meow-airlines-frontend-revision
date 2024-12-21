import { User } from "./User"
import { Flight } from "./Flight"

export type Booking = {
    type: "one-way" | "round-trip" | "multi-city";
    user_id: string;
    flight_id: string;
    booking_time: Date;
    total_amount: number;
    email: string;
    phone: string;
};
import { Booking } from "./Booking";
import { Seat } from "./Seat";

export type Ticket = {
    booking_id: Booking;
    status: "confirmed" | "canceled";
    passenger_name: string;
    dob: Date;
    gender: boolean;
    id_type: "nin" | "passport";
    id_number: string;
    issuing_date: Date;
    country_code: number;
    seat_id: Seat[];
}
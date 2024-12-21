import { Booking } from "./Booking";
import { Seat } from "./Seat";

export type Ticket = {
    booking_id: string;
    status: string;
    passenger_name: string;
    dob: Date;
    gender: boolean;
    id_type: string;
    id_number: string;
    issuing_date: Date;
    country_code: number;
    seat_id: string[];
}
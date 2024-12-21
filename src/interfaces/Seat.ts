import { Flight } from "./Flight"

export type Seat = {
    flight_id: string;
    seat_number: string;
    class: "Economy" | "Business" | "First";
    availability: boolean;
    price: number;
}
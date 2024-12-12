import { Flight } from "./Flight"

export type Seat = {
    flight_id: Flight;
    seat_number: string;
    class: "Economy" | "Business" | "First";
    availability: boolean;
    price: number;
}
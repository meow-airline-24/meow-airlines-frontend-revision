import { Aircraft } from "./Aircraft";

export type Flight = {
    flight_number: string,
    airline: string,
    departure_airport: string,
    arrival_airport: string,
    departure_time: Date,
    arrival_time: Date,
    book_exp: Date,
    aircraft_id: Aircraft
}
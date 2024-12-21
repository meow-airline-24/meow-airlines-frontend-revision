import { AircraftModel } from "./AircraftModel";

export type Aircraft = {
    _id: string;
    model: string;
    manufacture_year: number;
    status: "Active" | "Inactive";
}
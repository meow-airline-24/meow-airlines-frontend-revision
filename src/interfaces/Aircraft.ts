import { AircraftModel } from "./AircraftModel";

export type Aircraft = {
    model: AircraftModel;
    manufacture_year: number;
    status: "Active" | "Inactive";
}
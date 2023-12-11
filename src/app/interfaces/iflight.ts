import { IGate } from "./igate";
import { ISeat } from "./iseat";
import { ITerminal } from "./iterminal";


export interface IFlight {
    id: number,
    origin_id: number,
    destination_id: number,
    departure: Date,
    arrival: Date,
    duration: number,
    price: number,
    available_seats: number,
    available_luggage: number,
    terminal: number,
    gate: number,
    img: string,
}

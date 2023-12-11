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
    domestic: boolean,
    price: number,
    seat: ISeat[],
    max_luggage: number,
    terminal: ITerminal,
    gate: IGate,
    img: string,
}

import { ISeat } from "./iseat";


export interface IBooking {
    id: number,
    seat: ISeat[],
    passengers: string,
    luggage: number,
}

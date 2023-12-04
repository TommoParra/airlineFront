import { ISeat } from "./iseat";


export interface IBooking {
    id: number,
    class: string,
    seat: ISeat[],
    passengers: string,
    luggage: number,
}

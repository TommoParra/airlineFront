
export interface IFlight {
    id: number,
    origin_id: number,
    destination_id: number,
    destination_city: string,
    departure: Date,
    arrival: Date,
    duration: number,
    price: number,
    available_seats: number,
    available_luggage: number,
    terminal: number,
    gate: number,
    img: string,
    status: string,
}

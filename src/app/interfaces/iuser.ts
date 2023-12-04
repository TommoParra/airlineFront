import { IBooking } from "./ibooking";

export interface IUser {
    id: number,
    first_name: string,
    last_name: string,
    personal_id: string,
    email: string,
    phone: number,
    password: string,
    access_level: string,
    membership: string,
    bookings: IBooking[]
}

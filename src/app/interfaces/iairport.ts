import { IGate } from "./igate";
import { ITerminal } from "./iterminal";

export interface IAirport {
    name: string,
    name_acr: string,
    city: string,
    city_acr: string,
    terminals: ITerminal[],
    gates: IGate[],
    img: string,
}

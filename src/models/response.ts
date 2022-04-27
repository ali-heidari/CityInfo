import { CityModel } from "./city";

export class ResponseModel {
    constructor(public suggestions: CityModel[]) { }
}
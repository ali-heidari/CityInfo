export class CityModel {
    name: string;
    latitude: number;
    longitude: number;
    distance: number;

    constructor(name: string, latitude: number, longitude: number, distance: number) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distance = distance;
    }
}
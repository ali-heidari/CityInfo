import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exception, RequiredParameterException } from 'src/exceptions';
import { CityModel } from 'src/models/city';
import { GeoPoint } from 'src/models/geo-point';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class SuggestionsService {
  EarthRadius: number = 6378137.0;
  TwoPi: number = Math.PI * 2;
  DegreesToRadians: number = 0.0174532925;
  RadiansToDegrees: number = 57.2957795;

  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>
  ) { }

  /**
     * Gets a new latitude with the specified Radius from the given latitude
     * @param latitude source latitude
     * @param longitude source longitude
     * @param radius Radius in meters
     * @param bearing Degree of direction; Up=0, Right=90, Down=180 and Left=270.
     * @returns {GeoPoint} An array of latitude and longitude.
     */
  getLatitudeLongitude(latitude: number, longitude: number, radius: number, bearing: number): GeoPoint {
    let latA: number = latitude * this.DegreesToRadians;
    let lonA: number = longitude * this.DegreesToRadians;
    let angularDistance: number = radius / this.EarthRadius;
    let trueCourse: number = bearing * this.DegreesToRadians;

    let lat: number = Math.asin(
      Math.sin(latA) * Math.cos(angularDistance) +
      Math.cos(latA) * Math.sin(angularDistance) * Math.cos(trueCourse));

    let dlon: number = Math.atan2(
      Math.sin(trueCourse) * Math.sin(angularDistance) * Math.cos(latA),
      Math.cos(angularDistance) - Math.sin(latA) * Math.sin(lat));

    let lon: number = ((lonA + dlon + Math.PI) % this.TwoPi) - Math.PI;

    return new GeoPoint(lat * this.RadiansToDegrees, lon * this.RadiansToDegrees);
  }

  private async query(conditions) {
    const result = await this.cityModel.find(conditions, { _id: 0, 'name': 1, 'lat': 1, 'long': 1 }).exec();
    return result.map(item => new CityModel(item.name, item.lat, item.long, 0));
  }

  /**
   * Find items by name
   * @param name can be complete or partial
   * @returns List of cities
   */
  private findByName(name: string): Promise<CityModel[]> {
    return this.query({ name: name + /.*/ });
  }

  /**
   * Find items by name
   * @param name can be complete or partial
   * @param latitude source latitude
   * @param longitude source longitude
   * @returns List of cities
   */
  private findByCoordinate(name: string, latitude: number, longitude: number): Promise<CityModel[]> {
    return this.query({ name: name + /.*/, lat: latitude, long: longitude });
  }

  /**
   * Find items by name
   * @param name can be complete or partial
   * @param latitude source latitude
   * @param longitude source longitude
   * @param radius Radius in meters
   * @returns List of cities
   */
  private findByRadius(name: string, latitude: number, longitude: number, radius: number): Promise<CityModel[]> {
    let topLatLng = this.getLatitudeLongitude(latitude, longitude, radius, 0);
    let bottomLatLng = this.getLatitudeLongitude(latitude, longitude, radius, 180);

    let rightLatLng = this.getLatitudeLongitude(latitude, longitude, radius, 90);
    let leftLatLng = this.getLatitudeLongitude(latitude, longitude, radius, 270);

    return this.query({
      name: { $regex: '^' + name + '.*' },
      lat: { $gte: bottomLatLng[0], $lt: topLatLng[0] },
      long: { $gte: leftLatLng[1], $lt: rightLatLng[1] }
    });
  }

  /**
   * Find items by name
   * @param name can be complete or partial
   * @param latitude source latitude
   * @param longitude source longitude
   * @param radius Radius in meters
   * @returns List of cities
   */
  find(name: string, latitude: number = null, longitude: number = null, radius: number = null): Promise<CityModel[]> {
    if (radius > 0) {
      if (!latitude || !longitude) {
        throw new RequiredParameterException("Latitude, Longitude");
      }
      return this.findByRadius(name, latitude, longitude, radius);
    }

    if (latitude && longitude) {
      return this.findByCoordinate(name, latitude, longitude);
    }

    return this.findByName(name);
  }

  /**
   * Find city by id
   * @param id City id
   * @returns City
   */
  async findOne(id: string): Promise<CityModel> {
    const results = await this.query({ id: id });
    if (results && results.length > 0) {
      return results[0];
    }
    return null
  }
}

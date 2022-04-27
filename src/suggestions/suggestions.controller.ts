import { Controller, Get, Query } from '@nestjs/common';
import { SortType } from '../sort-type';
import { RequiredParameterException } from '../exceptions';
import { SuggestionsService } from './suggestions.service';
import { CityModel } from '../models/city';
import { ResponseModel } from '../models/response';

@Controller('suggestions')
export class SuggestionsController {
    constructor(private readonly suggestionsService: SuggestionsService) { }

    @Get()
    async getSuggestions(@Query('q') query: string,
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number,
        @Query('sort') sort: SortType): Promise<ResponseModel> {

        if (!query) {
            throw new RequiredParameterException("query");
        }

        latitude = parseFloat(latitude.toString());
        longitude = parseFloat(longitude.toString());
        radius = parseFloat(radius.toString());

        let cities: CityModel[] = await this.suggestionsService.find(query, latitude, longitude, radius * 1000);
        cities = cities.sort((item1, item2) => {
            if (sort == SortType.distance) {
                return item1.distance - item2.distance;
            } else if (sort == SortType.name) {
                if (item1.name > item2.name) {
                    return 1;
                }
                if (item1.name < item2.name) {
                    return -1;
                }
            }
            return 0;
        })
        return new ResponseModel(cities);
    }
}

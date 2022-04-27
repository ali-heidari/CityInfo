import { Controller, Get, Query } from '@nestjs/common';
import { SortType } from '../sort-type';
import { RequiredParameterException } from '../exceptions';
import { City } from './schemas/city.schema';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
    constructor(private readonly suggestionsService: SuggestionsService) { }

    @Get()
    async getSuggestions(@Query('q') query: string,
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number,
        @Query('sort') sort: SortType): Promise<City[]> {

        if (!query) {
            throw new RequiredParameterException("Query can be complete or partial!");
        }

        return await this.suggestionsService.findAll();
    }
}

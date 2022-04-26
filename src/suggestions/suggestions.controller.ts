import { Controller, Get, Query } from '@nestjs/common';
import { City } from './schemas/city.schema';
import { SuggestionsService } from './suggestions.service';

@Controller('suggestions')
export class SuggestionsController {
    constructor(private readonly suggestionsService: SuggestionsService) { }

    @Get()
    async getSuggestions(@Query('q') query: string,
        @Query('coordinate') coordinate: string,
        @Query('radius') radius: string,
        @Query('sort') sort: string): Promise<City[]> {
        return await this.suggestionsService.findAll();
    }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { City, CitySchema } from './schemas/city.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
    controllers: [SuggestionsController],
    providers: [SuggestionsService],
})
export class SuggestionsModule { }
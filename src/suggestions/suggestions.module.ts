import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { City, CitySchema } from './schemas/city.schema';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
    imports: [MongooseModule.forFeature([{ name: City.name, schema: CitySchema }])],
    controllers: [SuggestionsController],
    providers: [SuggestionsService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        }],
})
export class SuggestionsModule { }
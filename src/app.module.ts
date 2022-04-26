import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsModule } from './suggestions/suggestions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    SuggestionsModule
  ]
})
export class AppModule { }

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
    SuggestionsModule
  ]
})
export class AppModule { }


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
    @Prop()
    id: number;
    @Prop()
    name: string;
    @Prop()
    ascii: string;
    @Prop()
    alt_name: string;
    @Prop()
    lat: number;
    @Prop()
    long: number;
    @Prop()
    feat_class: string;
    @Prop()
    feat_code: string;
    @Prop()
    country: string;
    @Prop()
    cc2: string;
    @Prop()
    admin1: number;
    @Prop()
    admin2: number;
    @Prop()
    admin3: string;
    @Prop()
    admin4: string;
    @Prop()
    population: number;
    @Prop()
    elevation: string;
    @Prop()
    dem: number;
    @Prop()
    tz: string;
    @Prop()
    modified_at: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);

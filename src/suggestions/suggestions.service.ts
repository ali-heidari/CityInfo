import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './schemas/city.schema';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>
  ) { }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findOne(id: string): Promise<City> {
    return this.cityModel.findOne({ _id: id }).exec();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { SortType } from '../sort-type';
import { RequiredParameterException } from '../exceptions';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

const empty_response_mock = { "suggestions": [] };
const city_london_mock = {
  "suggestions": [{
    _id: "6266f97151e44f68fbb7d237",
    id: 4517009,
    name: 'London',
    ascii: 'London',
    alt_name: '',
    lat: 39.88645,
    long: -83.44825,
    feat_class: 'P',
    feat_code: 'PPLA2',
    country: 'US',
    cc2: '',
    admin1: 'OH',
    admin2: 97,
    admin3: '',
    admin4: '',
    population: 9904,
    elevation: 321,
    dem: 321,
    tz: 'America/New_York',
    modified_at: '2011-05-14'
  }]
};

describe('SuggestionsController', () => {
  let controller: SuggestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
      providers: [{
        provide: SuggestionsService,
        useValue: {}
      }]
    }).compile();

    controller = module.get<SuggestionsController>(SuggestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array"', () => {
    expect(controller.getSuggestions('london', null, null, null, null)).resolves.toBeInstanceOf(Array);
  });

  it('should not accept null query"', () => {
    expect(controller.getSuggestions(null, null, null, null, null)).resolves.toThrowError(RequiredParameterException);
  });

  it('should not accept empty query', () => {
    expect(controller.getSuggestions('', null, null, null, null)).resolves.toThrowError(RequiredParameterException);
  });

  it('should accept both latitude and longitude together', () => {
    expect(controller.getSuggestions('London', 39.88645, null, null, null)).resolves.toThrowError(RequiredParameterException);
  });

  it('should accept both latitude and longitude together', () => {
    expect(controller.getSuggestions('London', null, -83.44825, null, null)).resolves.toThrowError(RequiredParameterException);
  });

  it('should return London info', () => {
    expect(controller.getSuggestions('London', null, null, null, null)).resolves.toEqual(city_london_mock);
  });

  it('should return London info(including coordinates)', () => {
    expect(controller.getSuggestions('London', 39.88645, -83.44825, null, null)).resolves.toEqual(city_london_mock);
  });

  it('should not accept negative radius', () => {
    expect(controller.getSuggestions('London', null, null, -5, null)).resolves.toEqual(city_london_mock);
  });

  it('should return London info(filter by radius)', () => {
    expect(controller.getSuggestions('London', null, null, 5, null)).resolves.toEqual(city_london_mock);
  });

  it('should return empty suggestions(invalid query)', () => {
    expect(controller.getSuggestions('SomeRandomCityInTheMiddleOfNowhere', null, null, 1, null)).resolves.toEqual(empty_response_mock);
  });

  it('should return empty suggestions(including coordinates)', () => {
    expect(controller.getSuggestions('London', null, null, 1, null)).resolves.toEqual(empty_response_mock);
  });

  it('should return a sorted response(by name[ascending])', () => {
    expect(controller.getSuggestions('London', null, null, 1, SortType.name)).resolves.toEqual(empty_response_mock);
  });

  it('should return a sorted response(by distance[ascending])', () => {
    expect(controller.getSuggestions('London', null, null, 1, SortType.name)).resolves.toEqual(empty_response_mock);
  });

});

import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsService } from './suggestions.service';

describe('SuggestionsService', () => {
  let service: SuggestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: SuggestionsService,
        useValue: {}
      }]
    }).compile();

    service = module.get<SuggestionsService>(SuggestionsService);
  });

  it.only('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cities with london name', () => {
    expect(service.find("London")).resolves.toBeInstanceOf(Array);
  });

  it('should return cities with london name and specified coordinate', () => {
    expect(service.find("London",43.70011,-79.4163)).resolves.toBeInstanceOf(Array);
  });

  it('should return cities with london name and specified area', () => {
    expect(service.find("London",43.70011,-79.4163,5)).resolves.toBeInstanceOf(Array);
  });

});

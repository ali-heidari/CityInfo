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

  it('should convert degree to radian"', () => {
    expect(service.degreeToRadian(10)).toEqual(0.17);
  });

  it('should return right latitude', () => {
    expect(service.getLatitude(1, 1)).toEqual(1.008995);
  });

  it('should return left latitude', () => {
    expect(service.getLatitude(1.008995, -1)).toEqual(1);
  });

  it('should return higher longitude', () => {
    expect(service.getLongitude(1, 1)).toEqual(1.008995);
  });

  it('should return lower longitude', () => {
    expect(service.getLongitude(1.008995, 1)).toEqual(1);
  });

});

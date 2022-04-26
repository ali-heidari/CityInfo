import { Test, TestingModule } from '@nestjs/testing';
import { Exception } from 'src/exceptions/exception';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

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
    expect(controller.getSuggestions('london', null, null, null)).resolves.toBeInstanceOf(Array);
  });

  it('should return an array"', () => {
    expect(controller.getSuggestions(null, null, null, null)).resolves.toThrowError(Exception);
  });

  it('should return an array"', () => {
    expect(controller.getSuggestions('', null, null, null)).resolves.toThrowError(Exception);
  });

});

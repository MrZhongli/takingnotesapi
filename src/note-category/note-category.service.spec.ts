import { Test, TestingModule } from '@nestjs/testing';
import { NoteCategoryService } from './note-category.service';

describe('NoteCategoryService', () => {
  let service: NoteCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteCategoryService],
    }).compile();

    service = module.get<NoteCategoryService>(NoteCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

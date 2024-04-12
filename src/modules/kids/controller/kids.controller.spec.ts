import { Test, TestingModule } from '@nestjs/testing';
import { KidsController } from './kids.controller';
import { KidsService } from '../service/kids.service';
import { Repository } from 'typeorm';

describe('KidsController', () => {
  let controller: KidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KidsController],
      providers: [
        KidsService,
        {
          provide: 'KidRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<KidsController>(KidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

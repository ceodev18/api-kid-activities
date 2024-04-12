import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from '../service/activities.service';
import { Repository } from 'typeorm';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        ActivitiesService,
        {
          provide: 'ActivityRepository',
          useClass: Repository,
        },
        {
          provide: 'KidRepository',
          useClass: Repository,
        },
        {
          provide: 'KidActivityRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

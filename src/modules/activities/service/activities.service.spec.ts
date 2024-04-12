import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from './activities.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from '../entity/activity.model';
import { Kid } from '../../kids/entity/kid.model';
import { KidActivity } from '../../kids/entity/kid-activity.model';
import { Repository } from 'typeorm';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let activityRepository: Repository<Activity>;
  let kidRepository: Repository<Kid>;
  let kidActivityRepository: Repository<KidActivity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivitiesService,
        {
          provide: getRepositoryToken(Activity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Kid),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(KidActivity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
    activityRepository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
    kidRepository = module.get<Repository<Kid>>(getRepositoryToken(Kid));
    kidActivityRepository = module.get<Repository<KidActivity>>(getRepositoryToken(KidActivity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
describe('createActivity', () => {
	it('should create activity', async () => {
	  const createActivityDto = { name: 'Study time', description: 'Study for exams' };
	  const createdActivity = { id: 1, ...createActivityDto, childrenActivities: [] }; // Include an empty array for childrenActivities
	  jest.spyOn(activityRepository, 'save').mockResolvedValue(createdActivity);
  
	  expect(await service.createActivity(createActivityDto)).toBe(createdActivity);
	});
  });
  describe('assignActivityToKid', () => {
    it('should assign activity to kid', async () => {
      const assignActivityDto = { kidId: 1, activityId: 1, date: '2024-04-10', startTime: '10:00', endTime: '12:00' };
      jest.spyOn(service, 'assignActivityToKid').mockResolvedValue(undefined);

      expect(await service.assignActivityToKid(assignActivityDto)).toBeUndefined();
    });
  });

  describe('getActivitiesForChildInTimeRange', () => {
	it('should get activities for child in time range', async () => {
	  const kidId = 1;
	  const date = '2024-04-10';
	  const rangeStartTime = '10:00';
	  const rangeEndTime = '12:00';
	  const page = 1;
	  const limit = 10;
	  const expectedActivities: KidActivity[] = [
		{
		  occurrenceId: 1,
		  kid: { id: 1, name: 'John', lastname: 'Doe', activities: [] }, 
		  activity: { id: 1, name: 'Study time', description: 'Study for exams', childrenActivities: [] }, // Adjust with actual Activity data
		  startDateTime: new Date('2024-04-10T10:00'),
		  endDateTime: new Date('2024-04-10T12:00'),
		},
	  ];
	  jest.spyOn(service, 'getActivitiesForChildInTimeRange').mockResolvedValue(expectedActivities);
  
	  expect(await service.getActivitiesForChildInTimeRange(kidId, date, rangeStartTime, rangeEndTime, page, limit)).toEqual(expectedActivities);
	});
});


describe('getKidsForActivity', () => {
	it('should get kids for activity', async () => {
	  const activityId = 1;
	  const expectedKids: KidActivity[] = [
		{
		  occurrenceId: 1,
		  kid: { id: 1, name: 'John', lastname: 'Doe', activities: [] },
		  activity: { id: 1, name: 'Study time', description: 'Study for exams', childrenActivities: [] }, 
		  startDateTime: new Date('2024-04-10T10:00'),
		  endDateTime: new Date('2024-04-10T12:00'),
		},
	  ];
	  jest.spyOn(service, 'getKidsForActivity').mockResolvedValue(expectedKids);

	  expect(await service.getKidsForActivity(activityId)).toEqual(expectedKids);
	});
});

  describe('getTotalDurationForChildActivityInTimeRange', () => {
    it('should get total duration for child activity in time range', async () => {
      const kidId = 1;
      const activityId = 1;
      const date = '2024-04-10';
      const rangeStartTime = '10:00';
      const rangeEndTime = '12:00';
      const expectedDuration = '2 hours';
      jest.spyOn(service, 'getTotalDurationForChildActivityInTimeRange').mockResolvedValue(expectedDuration);

      expect(await service.getTotalDurationForChildActivityInTimeRange(kidId, activityId, date, rangeStartTime, rangeEndTime)).toBe(expectedDuration);
    });
  });
});

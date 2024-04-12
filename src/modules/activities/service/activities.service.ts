import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInHours, parseISO, set } from 'date-fns';
import { KidActivity } from '../../kids/entity/kid-activity.model';
import { Kid } from '../../kids/entity/kid.model';
import {
	FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository
} from 'typeorm';
import { Activity } from '../entity/activity.model';
import { CreateActivityDto } from '../entity/activityDto';
import { AssignActivityDto } from '../entity/assignActivityDto';

@Injectable()
export class ActivitiesService {
	constructor(
		@InjectRepository(Activity)
		private readonly activitiesRepository: Repository<Activity>,
		@InjectRepository(Kid)
		private readonly kidRepository: Repository<Kid>,
		@InjectRepository(KidActivity)
		private readonly kidActivityRepository: Repository<KidActivity>,
	) { }

	async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
        try {
            const { name, description } = createActivityDto;

            const activity = new Activity();
            activity.name = name;
            activity.description = description;

            return await this.activitiesRepository.save(activity);
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Activity name already exists', HttpStatus.CONFLICT);
            } else {
                throw new HttpException('Failed to create activity', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

	async assignActivityToKid(assignActivityDto: AssignActivityDto): Promise<void> {
		const { kidId, activityId, date, startTime, endTime } = assignActivityDto;
		const activity = await this.activitiesRepository.findOne({ where: { id: activityId } });
		const kid = await this.kidRepository.findOne({ where: { id: kidId } });

		if (!kid || !activity) {
			throw new Error('Kid or activity not found');
		}

		// Parse date, startTime, and endTime strings into Date objects
		const dateStarted = parseISO(date);
		const startTimeParsed = parseISO(`${date}T${startTime}`);
		const endTimeParsed = parseISO(`${date}T${endTime}`);

		// Ensure start time is before end time
		if (startTimeParsed >= endTimeParsed) {
			throw new Error('End time must be after start time');
		}

		// Create a new KidActivity entity
		const kidActivity = new KidActivity();
		kidActivity.kid = kid;
		kidActivity.activity = activity;
		kidActivity.startDateTime = startTimeParsed;
		kidActivity.endDateTime = endTimeParsed;

		// Save the new KidActivity entity to the database
		await this.kidActivityRepository.save(kidActivity);
	}

	async getActivitiesForChildInTimeRange(
		kidId: number,
		date: string,
		rangeStartTime: string,
		rangeEndTime: string,
		page = 1,
		limit = 10,
	): Promise<KidActivity[]> {
		const startTimeParsed = new Date(`${date}T${rangeStartTime}`);
		const endTimeParsed = new Date(`${date}T${rangeEndTime}`);

		const offset = (page - 1) * limit;

		const queryOptions: FindManyOptions<KidActivity> = {
			where: {
				kid: { id: kidId },
				startDateTime: MoreThanOrEqual(startTimeParsed),
				endDateTime: LessThanOrEqual(endTimeParsed),
			},
			relations: ['activity'],
			skip: offset,
			take: limit,
		};

		const activities = await this.kidActivityRepository.find(queryOptions);

		return activities;
	}

	async getKidsForActivity(activityId: number): Promise<KidActivity[]> {
		return this.kidActivityRepository.find({
			where: { activity: { id: activityId } },
			relations: ['kid'],
		});
	}

	async getTotalDurationForChildActivityInTimeRange(
		kidId: number,
		activityId: number,
		date: string,
		rangeStartTime: string,
		rangeEndTime: string,
	): Promise<string> {
		
		const startTimeParsed = new Date(`${date}T${rangeStartTime}`);
		const endTimeParsed = new Date(`${date}T${rangeEndTime}`);

		const kidActivities = await this.kidActivityRepository.find({
			where: {
				kid: { id: kidId },
				activity: { id: activityId },
				startDateTime: MoreThanOrEqual(startTimeParsed),
				endDateTime: LessThanOrEqual(endTimeParsed),
			},
		});

		let totalDurationInHours = 0;
		for (const activity of kidActivities) {
			totalDurationInHours += differenceInHours(activity.endDateTime, activity.startDateTime);
		}

		return `${totalDurationInHours} hours `;
	}
}

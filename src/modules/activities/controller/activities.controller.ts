import {
	Controller, Post, Body, Param, Get, Query,
	ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from '../service/activities.service';
import { CreateActivityDto } from '../entity/activityDto';
import { AssignActivityDto } from '../entity/assignActivityDto';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) { }

	@Post()
	async createActivity(@Body(new ValidationPipe({ whitelist: true })) createActivityDto: CreateActivityDto) {
		return this.activitiesService.createActivity(createActivityDto);
	}

	@Post('assign')
	async assignActivityToKid(@Body() assignActivityDto: AssignActivityDto) {
		await this.activitiesService.assignActivityToKid(assignActivityDto);
		return { message: 'Activity assigned to kid successfully' };
	}

	@Get('child/:kidId/activities')
	async getActivitiesForChild(
	  @Param('kidId') kidId: number,
	  @Query('date') date: string,
	  @Query('rangeStartTime') rangeStartTime: string,
	  @Query('rangeEndTime') rangeEndTime: string,
	) {
	  console.log('calling getActivitiesForChild');
	  return this.activitiesService.getActivitiesForChildInTimeRange(kidId, date, rangeStartTime, rangeEndTime);
	}

	@Get('activity/:activityId/kids')
	async getKidsForActivity(@Param('activityId') activityId: number) {
		console.log('calling getKidsForActivity');
		return this.activitiesService.getKidsForActivity(activityId);
	}

	@Get('child/:kidId/activity/:activityId/duration')
	async getTotalDurationForChildActivityInTimeRange(
		@Param('kidId') kidId: number,
		@Param('activityId') activityId: number,
		@Query('date') date: string,
		@Query('rangeStartTime') rangeStartTime: string,
		@Query('rangeEndTime') rangeEndTime: string,
	) {
		console.log('calling getTotalDurationForChildActivityInTimeRange');
		return this.activitiesService.getTotalDurationForChildActivityInTimeRange(
			kidId,
			activityId,
			date,
			rangeStartTime,
			rangeEndTime,
		);
	}
}


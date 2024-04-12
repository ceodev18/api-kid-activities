import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kid } from '../kids/entity/kid.model';
import { KidActivity } from '../kids/entity/kid-activity.model';
import { ActivitiesService } from './service/activities.service';
import { ActivitiesController } from './controller/activities.controller';
import { Activity } from './entity/activity.model';

@Module({
	imports: [
		TypeOrmModule.forFeature([Activity]),
		TypeOrmModule.forFeature([Kid]),
		TypeOrmModule.forFeature([KidActivity]),
	],
	controllers: [ActivitiesController],
	providers: [ActivitiesService],
})
export class ActivitiesModule { }

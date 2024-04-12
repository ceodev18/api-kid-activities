import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignActivityDto {
	@ApiProperty({
		required: true,
	})
	@IsNumber()
	@IsNotEmpty()
	kidId: number;

	@ApiProperty({
		required: true,
	})
	@IsNumber()
	@IsNotEmpty()
	activityId: number;

	@ApiProperty({
		required: true,
		example: '2024-04-10',
	})
	date: string;

	@ApiProperty({
		required: true,
		example: '12:00',
	})
	startTime: string;

	@ApiProperty({
		required: true,
		example: '14:00',
	})
	endTime: string;
}

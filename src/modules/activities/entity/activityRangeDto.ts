import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ActivityRangeDto {
	@ApiProperty({
		required: true,
		example: '2024-04-10',
	})
	date: Date;

	@ApiProperty({
		required: true,
		example: '12:00',
	})
	rangeStartTime: string;

	@ApiProperty({
		required: true,
		example: '14:00',
	})
	rangeEndTime: string;
}

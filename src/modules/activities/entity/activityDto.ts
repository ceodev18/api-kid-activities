import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateActivityDto {
	@ApiProperty({
		example: 'Study time',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		example: 'Study time description',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	description: string;
}

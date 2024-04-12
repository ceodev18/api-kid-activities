import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class KidDto {
	@ApiProperty({
		example: 'Christian',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(50, { message: 'Name must not exceed 50 characters' })
	name: string;

	@ApiProperty({
		example: 'Espinoza',
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(50, { message: 'Lastname must not exceed 50 characters' })
	lastname: string;
}

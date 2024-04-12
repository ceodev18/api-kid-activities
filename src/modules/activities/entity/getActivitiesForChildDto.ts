import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional, Min, Max } from 'class-validator';

export class GetActivitiesForChildDto {
    @ApiProperty({
		example: 1,
		required: true,
	})
    @IsInt()
    kidId: number;

    @ApiProperty({
		example: '2024-04-10',
		required: true,
	})
    @IsDateString()
    date: string;

    @ApiProperty({
		example: '08:00',
		required: true,
	})
    @IsDateString()
    rangeStartTime: string;

    @ApiProperty({
		example: '20:00',
		required: true,
	})
    @IsDateString()
    rangeEndTime: string;

    @ApiProperty()
    @IsInt()
    @Min(1)
    page?: number;
    
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;
}

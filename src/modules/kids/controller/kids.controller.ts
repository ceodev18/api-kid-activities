import { Controller, Post, Body, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { KidsService } from '../service/kids.service';
import { KidDto } from '../entity/dto/kidDto';

@ApiTags('Kids')
@Controller('kids')
export class KidsController {
	constructor(private readonly kidsService: KidsService) { }

	@Post()
	async create(@Body(new ValidationPipe({ whitelist: true })) kidDto: KidDto) {
		try {
			return await this.kidsService.createKid(kidDto);
		} catch (error) {
			throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}

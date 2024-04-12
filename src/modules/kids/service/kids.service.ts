import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kid } from '../entity/kid.model';
import { KidDto } from '../entity/dto/kidDto';

@Injectable()
export class KidsService {
	constructor(
		@InjectRepository(Kid)
		private readonly kidsRepository: Repository<Kid>,
	) { }

	async createKid(kidDto: KidDto): Promise<Kid> {
        try {
            const kid = new Kid();
            kid.name = kidDto.name;
            kid.lastname = kidDto.lastname;
            return await this.kidsRepository.save(kid);
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException('Kid name already exists', HttpStatus.CONFLICT);
            } else {
                throw new HttpException('Failed to create kid', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}

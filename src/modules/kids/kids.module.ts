import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KidsController } from './controller/kids.controller';
import { KidsService } from './service/kids.service';
import { Kid } from './entity/kid.model';

@Module({
	imports: [TypeOrmModule.forFeature([Kid])],
	controllers: [KidsController],
	providers: [KidsService],
})
export class KidsModule { }

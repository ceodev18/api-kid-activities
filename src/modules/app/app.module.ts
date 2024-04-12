import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { ActivitiesModule } from '../activities/activities.module';
import { KidsModule } from '../kids/kids.module';
import { Activity } from '../activities/entity/activity.model';
import { Kid } from '../kids/entity/kid.model';
import { KidActivity } from '../kids/entity/kid-activity.model';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
			load: [configuration],
			cache: false,
		}),
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('database.postgres.host'),
				port: configService.get('database.postgres.port'),
				username: configService.get('database.postgres.username'),
				password: configService.get('database.postgres.password'),
				database: configService.get('database.postgres.database'),
				entities: [Kid, Activity, KidActivity],
				synchronize: true,
				autoLoadEntities: true,
				ssl: {
					rejectUnauthorized: false,
				},
			}),
			inject: [ConfigService],
		}),
		KidsModule,
		ActivitiesModule,
	],
})
export class AppModule { }

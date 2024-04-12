import {
	Entity, Column, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';

import { Kid } from './kid.model';
import { Activity } from '../../activities/entity/activity.model';

@Entity()
export class KidActivity {
	@PrimaryGeneratedColumn()
	occurrenceId: number;

	@ManyToOne(() => Kid, kid => kid.activities)
	kid: Kid;

	@ManyToOne(() => Activity, activity => activity.childrenActivities)
	activity: Activity;

	@Column({ type: 'timestamp', nullable: false })
	startDateTime: Date;

	@Column({ type: 'timestamp', nullable: false })
	endDateTime: Date;
}

import { KidActivity } from '../../kids/entity/kid-activity.model';
import {
	Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany,
} from 'typeorm';

@Entity()
export class Activity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 255 })
	name: string;

	@Column({ type: 'text', nullable: true })
	description: string;

	@OneToMany(() => KidActivity, kidActivity => kidActivity.activity)
	childrenActivities: KidActivity[];
}

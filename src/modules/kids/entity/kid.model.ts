import {
	Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { KidActivity } from './kid-activity.model';

@Entity()
export class Kid {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 50 })
	name: string;

	@Column({ length: 50 })
	lastname: string;

	@OneToMany(() => KidActivity, kidActivity => kidActivity.kid)
	activities: KidActivity[];
}

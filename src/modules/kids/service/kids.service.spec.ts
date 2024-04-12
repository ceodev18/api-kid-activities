import { Test, TestingModule } from '@nestjs/testing';
import { KidsService } from './kids.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Kid } from '../entity/kid.model';

describe('KidsService', () => {
	let service: KidsService;
	let repositoryMock: Record<string, jest.Mock>;

	beforeEach(async () => {
		repositoryMock = {
			save: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				KidsService,
				{
					provide: getRepositoryToken(Kid),
					useValue: repositoryMock,
				},
			],
		}).compile();

		service = module.get<KidsService>(KidsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createKid', () => {
		it('should create a new kid', async () => {
			const kidDto = { name: 'John', lastname: 'Doe' };
			const expectedKid = new Kid();
			expectedKid.name = kidDto.name;
			expectedKid.lastname = kidDto.lastname;

			repositoryMock.save.mockResolvedValue(expectedKid);

			const result = await service.createKid(kidDto);

			expect(result).toEqual(expectedKid);
			expect(repositoryMock.save).toHaveBeenCalledWith(expectedKid);
		});
	});
});

import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { PrismaService } from '../prisma/prisma.service';

const fakePrismaService = {
    superHero: {
        findMany: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

describe('SuperheroService', () => {
    let service: SuperheroService;
    let prisma: typeof fakePrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SuperheroService,
                {
                    provide: PrismaService,
                    useValue: fakePrismaService,
                },
            ],
        }).compile();

        service = module.get<SuperheroService>(SuperheroService);
        prisma = module.get(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllSuperheros', () => {
        it('should return a list of superheros with pagination', async () => {
            const mockHeroes = [
                { id: '1', nickName: 'Superman', images: ['img1.jpg'] },
            ];
            const mockTotal = 1;

            prisma.superHero.findMany.mockResolvedValue(mockHeroes);
            prisma.superHero.count.mockResolvedValue(mockTotal);

            const result = await service.getAllSuperheros(1);

            expect(result).toEqual({
                data: [{ id: '1', nickName: 'Superman', imageUrl: 'img1.jpg' }],
                total: 1,
            });

            expect(prisma.superHero.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 5,
                select: expect.any(Object),
            });
        });
    });

    describe('createSuperHero', () => {
        it('should create a new superhero', async () => {
            const dto = {
                nickName: 'Batman',
                realName: 'Bruce',
                originDescription: 'Rich',
                superPowers: 'Money',
                catchPhrase: 'I am Batman',
                images: ['bat.jpg'],
            };

            const createdHero = { id: '123', ...dto, createdAt: new Date(), updatedAt: new Date() };

            prisma.superHero.create.mockResolvedValue(createdHero);

            const result = await service.createSuperHero(dto);

            expect(result).toEqual(createdHero);
            expect(prisma.superHero.create).toHaveBeenCalledWith({ data: dto });
        });
    });

    describe('getOneSuperHero', () => {
        it('should return a single hero', async () => {
            const hero = { id: '1', nickName: 'Flash', images: [] };
            prisma.superHero.findUnique.mockResolvedValue(hero);

            const result = await service.getOneSuperHero('1');
            expect(result).toEqual(hero);
        });
    });
});
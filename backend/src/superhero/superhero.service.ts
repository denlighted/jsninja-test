import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {SuperherosResponseInterface} from "./interfaces/superheros-response.interface";
import {CreateSuperheroRequest} from "./dto/create-superhero.dto";
import {UpdateSuperheroRequest} from "./dto/update-superhero.dto";

@Injectable()
export class SuperheroService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllSuperheros(page:number=1): Promise<{data:SuperherosResponseInterface[],total:number}> {
        const pageSize =5;
        const skip = (page - 1) * pageSize;
        const [superHeroes,total] =await Promise.all([ this.prismaService.superHero.findMany({
            skip:skip,
            take:pageSize,
            select:{
                nickName:true,
                images:true
            }
        }),
        this.prismaService.superHero.count()])

        return {
            data: superHeroes.map(item => ({
                nickName: item.nickName,
                imageUrl: item.images[0] ?? null
            })),
            total: total
        };

    }

    async getOneSuperHero(superheroId:string){
        const superHero = await this.prismaService.superHero.findUnique({where:{id:superheroId}});

        if(!superHero){
            throw new NotFoundException("No such super hero");
        }

        return superHero;

    }

    async createSuperHero(dto:CreateSuperheroRequest){
        const {nickName,realName,originDescription,superPowers,catchPhrase,images} =dto

        const superhero = await this.prismaService.superHero.findUnique({
            where: {
                nickName: dto.nickName,
            },
        });

        if(superhero){
            throw new ConflictException("Superhero already exists");
        }

        return this.prismaService.superHero.create({data:{
            nickName: nickName,
            realName:realName,
            originDescription:originDescription,
            superPowers:superPowers,
            catchPhrase:catchPhrase,
            images:images,
            }});
    }

    async updateSuperHero(superHeroId:string, dto:UpdateSuperheroRequest){

        const superHero = await this.getOneSuperHero(superHeroId);

        return this.prismaService.superHero.update({where:{id:superHero.id},data: {...dto}});
    }

    async removeSuperHero(superheroId: string): Promise<string> {
        const superHero = await this.prismaService.superHero.findUnique({where:{id: superheroId}});
        if(!superHero){
            throw new NotFoundException("Not found such superhero");
        }
        await this.prismaService.superHero.delete({where:{id: superheroId}});

        return superheroId;
    }
}

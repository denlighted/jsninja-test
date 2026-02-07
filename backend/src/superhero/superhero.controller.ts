import {Controller, Get, Query, Param, ParseUUIDPipe, Post, Body, Patch, Delete, ParseIntPipe} from '@nestjs/common';
import {SuperheroService} from './superhero.service';
import {CreateSuperheroRequest} from "./dto/create-superhero.dto";
import {UpdateSuperheroRequest} from "./dto/update-superhero.dto";

@Controller('superheroes')
export class SuperheroController {
    constructor(private readonly superheroService: SuperheroService) {
    }

    @Get()
    async getAllSuperHeroes(@Query('page',ParseIntPipe) page: number) {
        return await this.superheroService.getAllSuperheros(page);
    }

    @Get("/:id")
    async getOneSuperHero(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.superheroService.getOneSuperHero(id)
    }

    @Post()
    async createSuperHero(@Body() dto: CreateSuperheroRequest) {
        return await this.superheroService.createSuperHero(dto);
    }

    @Patch("/:id")
    async updateSuperHero(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateSuperheroRequest) {
        return await this.superheroService.updateSuperHero(id, dto);
    }

    @Delete("/:id")
    async deleteSuperHero(@Param('id', new ParseUUIDPipe()) id: string) {
      return await this.superheroService.removeSuperHero(id);
    }
}

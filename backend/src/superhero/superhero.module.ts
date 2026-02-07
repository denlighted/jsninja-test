import { Module } from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { SuperheroController } from './superhero.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  imports:[PrismaModule],
  controllers: [SuperheroController],
  providers: [SuperheroService],

})
export class SuperheroModule {}

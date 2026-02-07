import {IsOptional, IsString} from "class-validator";
import { Transform } from 'class-transformer';

export class UpdateSuperheroRequest{
    @IsString({ message: 'Origin description should be a string' })
    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    originDescription?:string

    @IsString({ message: 'Catch phrase should be a string' })
    @IsOptional()
    @Transform(({ value }) => value === '' ? undefined : value)
    catchPhrase?:string

    @IsString({ message: 'Path to image should be a string', each: true },)
    @IsOptional()
    @Transform(({ value }) => {
        if(value ==='') return [];
        if(typeof value === 'string') return [value];
        return value;
    })
    images?:string[]
}
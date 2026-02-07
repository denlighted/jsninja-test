import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateSuperheroRequest {
    @IsNotEmpty({ message: 'Nickname should not be empty' })
    @IsString({ message: 'Nickname should be a string' })
    nickName:string

    @IsNotEmpty({ message: 'Superhero should have real name' })
    @IsString({ message: 'Superhero real name should be a string' })
    realName:string

    @IsString({ message: 'Origin description should be a string' })
    @IsOptional()
    originDescription?:string

    @IsNotEmpty({ message: 'Superhero should have own superpowers' })
    @IsString({ message: 'Superpowers should be a string' })
    superPowers:string

    @IsString({ message: 'Catch phrase should be a string' })
    @IsOptional()
    catchPhrase?:string

    @IsArray()
    @IsOptional()
    @IsString({ message: 'Path to image should be a string', each: true },)
    images?:string[]
}
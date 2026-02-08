import type {SuperHero, SuperHeroesList} from "../../api/superheroes/superheroes.api";

export interface SuperHeroState{
    superHeroes: SuperHeroesList[]
    total:number
    page:number
    currentSuperHero:SuperHero|null
    isLoading:boolean
    error:string|undefined
}
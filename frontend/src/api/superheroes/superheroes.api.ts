import api from '../axios';

export interface SuperHero {
    id:string
    nickName:string
    realName:string
    originDescription:string
    superPowers:string
    catchPhrase:string
    images:string[]
}

export interface SuperHeroesResponse {
    data: SuperHero[];
    total: number;
}

export type CreateSuperHero = Omit<SuperHero, "id">;

export type UpdateSuperHero = Partial<Pick<SuperHero,"originDescription" | "catchPhrase" | "images">>;

export async function getAllSuperHeroes(page:number=1): Promise<SuperHeroesResponse[]> {
    const response = await api.get<SuperHeroesResponse>(`/superheroes`, {params:{page:page}});
    return response.data;
}

export async function getOneSuperHero(superHeroId: string): Promise<SuperHero> {
    const response = await api.get<SuperHero>(`/superheroes/${superHeroId}`);
    return response.data
}

export async function createSuperHero(data:CreateSuperHero): Promise<SuperHero> {
    const response = await api.post<SuperHero>(`/superheroes`,data);
    return response.data;
}

export async function updateSuperHero(superHeroId:string,data:UpdateSuperHero): Promise<SuperHero> {
    const response = await api.patch<SuperHero>(`/superheroes/${superHeroId}`,data);
    return response.data;
}

export async function deleteSuperHero(superHeroId: string): Promise<string> {
    const response = await api.delete(`/superheroes/${superHeroId}`);
    return response.data;
}
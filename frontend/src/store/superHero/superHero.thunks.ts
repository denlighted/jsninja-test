import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    createSuperHero,
    type CreateSuperHero, deleteSuperHero,
    getAllSuperHeroes,
    getOneSuperHero, updateSuperHero, type UpdateSuperHero
} from "../../api/superheroes/superheroes.api.ts";

export const fetchSuperHeroes = createAsyncThunk("superHeroes/fetchData", async(page:number)=>{
    const response = await getAllSuperHeroes(page);
    return response
});

export const fetchOneSuperHero = createAsyncThunk("superHeroes/fetchOneSuperHero", async(superHeroId:string)=>{
    const response = await getOneSuperHero(superHeroId);
    return response
})

export const addSuperHero =  createAsyncThunk("superHeroes/addSuperHero", async(data:CreateSuperHero)=>{
    const newSuperHero = await createSuperHero(data);
    return newSuperHero
})

export const editSuperHero = createAsyncThunk("superHeroes/editSuperHero", async({ superHeroId, data }: { superHeroId: string; data: UpdateSuperHero })=>{
    const response = await updateSuperHero(superHeroId,data);
    return response
})

export const removeSuperhero = createAsyncThunk("superHeroes/deleteSuperHero", async(superHeroId:string)=>{
    await deleteSuperHero(superHeroId);
    return superHeroId
})
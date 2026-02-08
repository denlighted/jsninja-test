import type {SuperHeroState} from "./superHero.types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {addSuperHero, editSuperHero, fetchOneSuperHero, fetchSuperHeroes, removeSuperhero} from "./superHero.thunks.ts";

const initialState:SuperHeroState= {
    superHeroes:[],
    total:0,
    page:1,
    currentSuperHero:null,
    isLoading:false,
    error:undefined
};

export const superHeroSlice = createSlice({
    name: "superHeros",
    initialState,
    reducers:{
        setPage:(state,action:PayloadAction<number>)=>{
            state.page = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchSuperHeroes.pending,state => {
                state.isLoading = true;
            })
            .addCase(fetchSuperHeroes.fulfilled, (state,action) => {
                state.isLoading = false
                state.superHeroes = action.payload.data;
                state.total = action.payload.total;
                state.error = undefined;
            })
            .addCase(fetchSuperHeroes.rejected, (state,action) => {
                state.error = action.error.message;
                state.isLoading =false;
            })

            .addCase(fetchOneSuperHero.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchOneSuperHero.fulfilled, (state,action) => {
                state.currentSuperHero = action.payload;
                state.isLoading =false
            })
            .addCase(fetchOneSuperHero.rejected,(state,action)=>{
                state.error = action.error.message
                state.isLoading = false;
            })


            .addCase(addSuperHero.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(addSuperHero.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addSuperHero.rejected,(state,action)=>{
                state.error = action.error.message
                state.isLoading = false;
            })


            .addCase(editSuperHero.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(editSuperHero.fulfilled, (state,action) => {
                state.isLoading = false;
                const index = state.superHeroes.findIndex(h => h.id === action.payload.id);
                if(index!== -1){
                    state.superHeroes[index] = action.payload;
                }
                if (state.currentSuperHero?.id === action.payload.id) {
                    state.currentSuperHero = action.payload;
                }
            })
            .addCase(editSuperHero.rejected,(state,action)=>{
                state.error = action.error.message
                state.isLoading = false;
            })


            .addCase(removeSuperhero.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(removeSuperhero.fulfilled, (state,action
            ) => {
                state.isLoading = false;
                state.superHeroes = state.superHeroes.filter(hero => hero.id !== action.payload);
                state.total -= 1;
            })
            .addCase(removeSuperhero.rejected,(state,action)=>{
                state.error = action.error.message
                state.isLoading = false;
            })
    }
});

export const { setPage } = superHeroSlice.actions;
export default superHeroSlice.reducer;
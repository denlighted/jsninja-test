import {configureStore} from "@reduxjs/toolkit";
import superHeroReducer from "./superHero/superHero.slice";

export const store  = configureStore({
    reducer:{
        superHero:superHeroReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
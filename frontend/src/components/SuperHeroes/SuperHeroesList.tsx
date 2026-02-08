
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {fetchSuperHeroes} from "../../store/superHero/superHero.thunks.ts";
import cl from './SuperHeroesList.module.css'
import {Link} from "react-router-dom";
import CreateSuperHero from "../SuperHero/CreateSuperHero.tsx";


export const SuperHeroesList = () => {
    const dispatch = useAppDispatch();

    const {superHeroes, isLoading,error} = useAppSelector(state => state.superHero)

    useEffect(()=>{
        dispatch(fetchSuperHeroes(1))
    },[dispatch]);

    if(isLoading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error...</div>
    }

    return (
        <div className={cl.container}>
            <h1 className={cl.title}>Superheroes List</h1>

            <CreateSuperHero />

            <div className={cl.grid}>
                {superHeroes.map((hero) => (
                    <Link to={`/hero/${hero.id}`} key={hero.id}>
                    <div  className={cl.card}>
                        <div className={cl.imageContainer}>
                            {hero.imageUrl ? (
                                <img
                                    src={hero.imageUrl}
                                    alt={hero.nickName}
                                    className={cl.image}
                                />
                            ) : (
                                <div className={cl.placeholder}>No Image</div>
                            )}
                        </div>
                        <h3 className={cl.nickname}>{hero.nickName}</h3>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SuperHeroesList;
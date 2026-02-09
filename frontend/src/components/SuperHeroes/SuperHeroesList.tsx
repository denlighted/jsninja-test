
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {useEffect} from "react";
import {fetchSuperHeroes} from "../../store/superHero/superHero.thunks.ts";
import cl from './SuperHeroesList.module.css'
import {Link} from "react-router-dom";
import CreateSuperHero from "../SuperHero/CreateSuperHero.tsx";
import {setPage} from "../../store/superHero/superHero.slice.ts";


export const SuperHeroesList = () => {
    const dispatch = useAppDispatch();

    const {superHeroes, isLoading,error,total,page} = useAppSelector(state => state.superHero)

    const limit = 5;

    const totalPages = Math.ceil(total/limit);

    useEffect(()=>{
        dispatch(fetchSuperHeroes(page))
    },[dispatch,page]);

    const handleNextPage = ()=>{
        if(page<totalPages){
            dispatch(setPage(page+1));
        }
    };

    const handlePrevPage = ()=>{
        if(page>1){
            dispatch(setPage(page-1));
        }
    }


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
            {total > 0 && (
                <div className={cl.pagination}>
                    <button
                        className={cl.pageBtn}
                        onClick={handlePrevPage}
                        disabled={page === 1}
                    >
                        ← Prev
                    </button>

                    <span className={cl.pageInfo}>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        className={cl.pageBtn}
                        onClick={handleNextPage}
                        disabled={page >= totalPages}
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default SuperHeroesList;
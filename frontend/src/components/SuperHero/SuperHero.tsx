import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {editSuperHero, fetchOneSuperHero, removeSuperhero} from "../../store/superHero/superHero.thunks.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import cl from "./SuperHero.module.css";

const SuperHero = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();

    const {currentSuperHero, isLoading, error} = useAppSelector(state => state.superHero);

    const [originDescription, setOriginDescription] = useState("");
    const [catchPhrase, setCatchPhrase] = useState("");
    const [imagesStr, setImagesStr] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchOneSuperHero(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentSuperHero) {
            setOriginDescription(currentSuperHero.originDescription || "");
            setCatchPhrase(currentSuperHero.catchPhrase || "");
            setImagesStr(currentSuperHero.images ? currentSuperHero.images.join(', ') : "");
        }
    }, [currentSuperHero]);

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this superHero?")) {
            if (id) {
                dispatch(removeSuperhero(id))
                navigate("/")
            }

        }
    }

    const handleSave = async () => {
        if (id) {
            const imagesArray = imagesStr.split(',').map(url => url.trim()).filter(url => url.length > 0);
            await dispatch(editSuperHero({
                superHeroId: id, data: {
                    originDescription,
                    catchPhrase,
                    images:imagesArray
                }
            }));
            setIsEditing(false);
        }
    }

    const handleCancel = () => {
        if (currentSuperHero) {
            setOriginDescription(currentSuperHero.originDescription);
            setCatchPhrase(currentSuperHero.catchPhrase);
            setImagesStr(currentSuperHero.images ? currentSuperHero.images.join(', ') : "");
        }
        setIsEditing(false);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error...</div>
    }
    if (!currentSuperHero) {
        return <div>Hero not found</div>;
    }


    return (
        <div className={cl.container}>
            <div className={cl.header}>
                <h1 className={cl.nickName}>{currentSuperHero.nickName}</h1>
                <p className={cl.realName}>Real Name: {currentSuperHero.realName}</p>
            </div>

            <div className={cl.section}>
                <span className={cl.label}>Catch Phrase</span>
                {isEditing ? (
                    <input
                        className={cl.input}
                        value={catchPhrase}
                        onChange={(e) => setCatchPhrase(e.target.value)}
                    />
                ) : (
                    <p className={cl.text}>"{currentSuperHero.catchPhrase}"</p>
                )}
            </div>

            <div className={cl.section}>
                <span className={cl.label}>Origin Story</span>
                {isEditing ? (
                    <textarea
                        className={cl.textarea}
                        rows={5}
                        value={originDescription}
                        onChange={(e) => setOriginDescription(e.target.value)}
                    />
                ) : (
                    <p className={cl.text}>{currentSuperHero.originDescription}</p>
                )}
            </div>

            {isEditing && (
                <div className={cl.section}>
                    <span className={cl.label}>Image URLs (comma separated)</span>
                    <textarea
                        className={cl.textarea}
                        rows={3}
                        value={imagesStr}
                        onChange={(e) => setImagesStr(e.target.value)}
                        placeholder="https://image1.com, https://image2.com"
                    />
                </div>
            )}

            {!isEditing && currentSuperHero.images?.length > 0 && (
                <div className={cl.section}>
                    <span className={cl.label}>Gallery</span>
                    <div className={cl.gallery}>
                        {currentSuperHero.images.map((img, index) => (
                            <img key={index} src={img} alt="Hero" className={cl.image} />
                        ))}
                    </div>
                </div>
            )}

            <div className={cl.buttonGroup}>
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className={`${cl.btn} ${cl.btnSave}`}>Save</button>
                        <button onClick={handleCancel} className={`${cl.btn} ${cl.btnCancel}`}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className={`${cl.btn} ${cl.btnEdit}`}>Edit</button>
                        <button onClick={handleDeleteClick} className={`${cl.btn} ${cl.btnRemove}`}>Remove</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SuperHero;
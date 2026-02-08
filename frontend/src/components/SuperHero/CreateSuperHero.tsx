import {useState} from "react";
import {useAppDispatch} from "../../store/hooks.ts";
import {addSuperHero, fetchSuperHeroes} from "../../store/superHero/superHero.thunks.ts";
import cl from "./CreateSuperHero.module.css"


const CreateSuperHero = () => {
    const [isCreating, setIsCreating] = useState(false);

    const [nickName, setNickName] = useState("");
    const [realName,setRealName] = useState("");
    const [originDescription, setOriginDescription] = useState("");
    const [superPowers, setSuperPowers] = useState("");
    const [catchPhrase,setCatchPhrase] = useState("");
    const [imagesStr,setImagesStr] = useState("");

    const dispatch = useAppDispatch();

    const resetForm = () => {
        setNickName("");
        setRealName("");
        setOriginDescription("");
        setSuperPowers("");
        setCatchPhrase("");
        setImagesStr("");
        setIsCreating(false);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if(e){
            e.preventDefault();
        }
        if(!nickName.trim()||!realName.trim()|| !superPowers.trim()) return

        const imagesArray = imagesStr.split(',').map(url => url.trim()).filter(url => url.length > 0);
        await dispatch(addSuperHero({
            nickName,
            realName,
            originDescription,
            superPowers,
            catchPhrase,
            images:imagesArray
        }))
        dispatch(fetchSuperHeroes(1));

        resetForm()


    }

    const handleKeyDown = (e:React.KeyboardEvent) => {
        if(e.key === "Enter") {
            e.preventDefault();
            void handleSubmit();
        }
        if (e.key === 'Escape') {
            resetForm();
        }
    }

    if(!isCreating){
        return (
            <div className={cl.container} style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
                <button className={`${cl.btn} ${cl.btnOpen}`} onClick={() => setIsCreating(true)}>
                    + Create New Superhero
                </button>
            </div>
        );
    }
    return (
        <div className={cl.container} onKeyDown={handleKeyDown}>
            <h2 className={cl.title}>New Hero</h2>

            <div className={cl.formGroup}>
                <input
                    className={cl.input}
                    placeholder="Nickname (Required)"
                    value={nickName}
                    onChange={e => setNickName(e.target.value)}
                    autoFocus
                />
            </div>

            <div className={cl.formGroup}>
                <input
                    className={cl.input}
                    placeholder="Real Name"
                    value={realName}
                    onChange={e => setRealName(e.target.value)}
                />
            </div>

            <div className={cl.formGroup}>
                <input
                    className={cl.input}
                    placeholder="Catch Phrase"
                    value={catchPhrase}
                    onChange={e => setCatchPhrase(e.target.value)}
                />
            </div>

            <div className={cl.formGroup}>
                <textarea
                    className={cl.textarea}
                    placeholder="Origin Description"
                    value={originDescription}
                    onChange={e => setOriginDescription(e.target.value)}
                />
            </div>

            <div className={cl.formGroup}>
                <textarea
                    className={cl.textarea}
                    placeholder="Superpowers"
                    value={superPowers}
                    onChange={e => setSuperPowers(e.target.value)}
                />
            </div>

            <div className={cl.formGroup}>
                <textarea
                    className={cl.textarea}
                    placeholder="Image URLs (comma separated)"
                    value={imagesStr}
                    onChange={e => setImagesStr(e.target.value)}
                />
            </div>

            <div className={cl.buttonGroup}>
                <button className={`${cl.btn} ${cl.btnCreate}`} onClick={handleSubmit}>Create</button>
                <button className={`${cl.btn} ${cl.btnCancel}`} onClick={resetForm}>Cancel</button>
            </div>
        </div>
    );

};

export default CreateSuperHero;
import './App.css'
import SuperHeroesList from "./components/SuperHeroes/SuperHeroesList.tsx";
import SuperHero from "./components/SuperHero/SuperHero.tsx";
import {Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SuperHeroesList />} />
                <Route path="/hero/:id" element={<SuperHero />} />
            </Routes>
        </div>
    )
}

export default App

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
                <Route path="*" element={<h2>Page not found</h2>}/>
            </Routes>
        </div>
    )
}

export default App

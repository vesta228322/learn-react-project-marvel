import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';
import ComicsList from "../../ComicsList/ComicsList";

const App = () => {

    const {getComics} = useMarvelService();

    useEffect(() => {
        getComics().then(data => console.log(data));
    }, []);
    
    // useEffect(() => {
    //     getSoloInfo().then(res => console.log(res));
    //     getAllInfo().then(res => console.log(res));
    // }, []);
    

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <ErrorBaundary>
                    <RandomChar />
                </ErrorBaundary>
                <div className="char__content">
                    <ErrorBaundary>
                        <CharList onCharSelected={onCharSelected} />
                    </ErrorBaundary>
                    <ErrorBaundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBaundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}
                <ComicsList />
            </main>
        </div>
    )
}

export default App;
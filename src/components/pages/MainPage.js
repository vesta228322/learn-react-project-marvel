import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundary from "../errorBaundary/ErrorBaundary";

import decoration from '../../resources/img/vision.png';

function MainPage() {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBaundary>
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
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;
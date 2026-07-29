// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage, ComicsPage, SingleComicPage, Page404 } from '../pages';
// import useMarvelService from "../../services/MarvelService";
import AppHeader from "../appHeader/AppHeader";
import AppBanner from '../appBanner/AppBanner';




const App = () => {

    // const {getComics, getSoloInfo, getAllInfo} = useMarvelService();

    // useEffect(() => {
    //     getComics().then(data => console.log(data));
    // }, []);

    // useEffect(() => {
    //     getSoloInfo().then(res => console.log(res));
    //     getAllInfo().then(res => console.log(res));
    // }, []);




    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/comics' element={<ComicsPage>
                            <AppBanner />
                        </ComicsPage>} />
                        <Route path='/comics/:comicId' element={<SingleComicPage>
                            <AppBanner />
                        </SingleComicPage>} />
                        <Route path='*' element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
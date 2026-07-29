import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicPage = ({ children }) => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, clearError, getComics } = useMarvelService();

    useEffect(() => {

        clearError();
        getComics(comicId)
            .then(onComicLoaded);
    }, [comicId]);


    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;


    return (
        <>
            {children}
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {

    const { name, date, image, descr, characters } = comic;

    return (
        <div className="single-comic">
            <img src={image} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <div className="single-comic__descr" dangerouslySetInnerHTML={{ __html: descr }} />
                <p className="single-comic__descr">{`characcters: ${characters.length}`}</p>
                <div className="single-comic__price">{date}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;
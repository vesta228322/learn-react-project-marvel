import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

function ComicsList() {

    const { getAllComics, getComics, loading, error } = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(1121155); // 1129205
    const [newItemLoading, setNewItemLoading] = useState(false);


    const onRequest = useCallback((offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(1174770);
        getAllComics(offset)
            .then(newItems => {
                setComics(prevItems => [...prevItems, ...newItems]);
                setOffset(offset => offset + 8);
            })
            .finally(() => {
                setNewItemLoading(false);
            });

    }, [getAllComics]);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <>
            <div className="comics">
                {errorMessage}
                {spinner}
                <ul className='comics__list'>
                    {comics.map((item) => {
                        return (
                            <li className='comics__item' key={item.id} >
                                <Link to={`/comics/${item.id}`} >
                                    <img className='comics__poster' src={item.image} alt='poster' />
                                    <div className='comics__info'>
                                        <span className='comics__name' >{item.name}</span>
                                        <span className='comics__date' >{item.date}</span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button
                    className='button button__main button__long'
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}><div className="inner">{newItemLoading ? 'Loading...' : 'load more'}</div></button>
            </div>
        </>
    )
}

export default ComicsList;
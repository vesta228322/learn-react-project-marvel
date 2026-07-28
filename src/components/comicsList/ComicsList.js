import React, { useCallback, useEffect, useRef, useState } from 'react'

import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

function ComicsList() {

    const { getComics } = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(3223);
    const [newItemLoading, setNewItemLoading] = useState(false);


    const onRequest = useCallback((offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(newItems => {
                setComics(prevItems => [...prevItems, ...newItems]);
                setOffset(offset => offset + 8);
            })
            .finally(() => {
                setNewItemLoading(false);
            });

    }, [getComics]);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const myRef = useRef(null);

    const focusFirst = () => {
        myRef.current.focus();
    }

    return (
        <>
            <div className="comics">
                <ul className='comics__list'>
                    {comics.map((item) => {
                        return (
                            <li className='comics__item' tabIndex={0} ref={myRef} key={item.id} >
                                <img className='comics__poster' src={item.image} alt='poster' />
                                <div className='comics__info'>
                                    <span className='comics__name' >{item.name}</span>
                                    <span className='comics__date' >{item.date}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <button
                    className='button button__main button__long'
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}><div className="inner">load more</div></button>
            </div>
        </>
    )
}

export default ComicsList;
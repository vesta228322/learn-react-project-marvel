import React, { useEffect, useState } from 'react'

import AppSubHeader from '../appSubHeader/AppSubHeader';
import useMarvelService from '../services/MarvelService';

import './comicsList.scss';

function ComicsList({children}) {

    const {getComics} = useMarvelService();

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(3223);
    const [newItemLoading, setNewItemLoading] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getComics(offset)
            .then(newItems => setComics(prevItems => [...prevItems, ...newItems]));
            setNewItemLoading(false);
        setOffset(offset => offset + 8);
        
    }
    
  return (
    <>
        <AppSubHeader />

        <div className="comics">
            <ul className='comics__list'>
                {comics.map((item) => {
                    return (
                        <li key={item.id} >
                            <img className='comics__poster' src={item.image} />
                            <div className="comics__info">
                                <span className='comics__name' >{item.name == null ? 'Name not found' : item.name}</span>
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
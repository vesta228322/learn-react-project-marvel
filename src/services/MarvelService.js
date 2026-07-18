import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {req, loading, error, clearError} = useHttp();

    const _apiBase = 'http://localhost:3001/comicvine/';
    const _baseOffset = 12;
    
    const getAllInfo = async () => {
        const res = await req(`${_apiBase}characters?limit=10`);
        return res;
    }

    const getSoloInfo = async () => {
        const res = await req(`${_apiBase}character/4005-1529`);
        return res;
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await req(`${_apiBase}characters?limit=9&offset=${offset}`);
        return res.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await req(`${_apiBase}character/4005-${id}?`);
        return _transformCharacter(res.results);
    }

    const getRandomCharacter = async (offset) => {
        const res = await req(`${_apiBase}characters?limit=1&offset=${offset}`);
        return _transformCharacter(res.results[0]);
    }

    const getComics = async (offset) => {
        const res = await req(`${_apiBase}issues?limit=8&offset=${offset}`);
        console.log(res);
        return res.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.deck || 'Description is missing',
            thumbnail: char.image.original_url,
            comics: char.issue_credits ? char.issue_credits.slice(2, 14) : 'No comics',
            desc: char.description,
            homepage: char.site_detail_url,
            wiki: char.api_detail_url
        }
    }

    const _transformComics = (comics) => {
        return {
            name: comics.name,
            image: comics.image.original_url,
            date: comics.cover_date,
            id: comics.id
        }
    }

    return {
        loading, 
        error, 
        clearError, 
        getAllCharacters, 
        getCharacter, 
        getAllInfo, 
        getSoloInfo, 
        getRandomCharacter,
        getComics
    }
}

export default useMarvelService;
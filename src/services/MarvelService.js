

class MarvelService {

    _apiBase = 'http://localhost:3001/comicvine/';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Не удалось извлечь ${url}, статус: ${res.status}`);
        }

        return await res.json();
    }


    getAllInfo = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=10`);
        return res;
    }

    getSoloInfo = async () => {
        const res = await this.getResource(`${this._apiBase}character/4005-1529`);
        return res;
    }

    getAllCharacters = async (offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}`);
        return res.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}character/4005-${id}?`);
        return this._transformCharacter(res.results);
    }

    getRandomCharacter = async (offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=1&offset=${offset}`);
        return this._transformCharacter(res.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.deck || 'Description is missing',
            thumbnail: char.image.original_url,
            comics: char.issue_credits ? char.issue_credits.slice(0, 16) : 'No comics',
            desc: char.description,
            homepage: char.site_detail_url,
            wiki: char.api_detail_url
        }
    }
}

export default MarvelService;
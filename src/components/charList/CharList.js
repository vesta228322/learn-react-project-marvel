import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 12,
        charEnd: false
    }

    itemRefs = [];

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }



    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnd: ended
        }));
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    focusOnItem = (i) => {
        this.itemRefs.map(item => item.classList.remove('char__item_selected'));
        this.itemRefs[i].classList.add('char__item_selected');
        this.itemRefs[i].focus();
    }

    renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li
                    key={item.id}
                    className="char__item"
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.focusOnItem(i);
                    }}
                    ref={elem => this.itemRefs[i] = elem}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                            e.preventDefault();
                        }

                    }} >
                    <img src={item.thumbnail} alt={item.name} />
                    <div className='char__name' >{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const { charList, loading, error, newItemLoading, offset, charEnd } = this.state;

        const items = this.renderItems(charList);
        const errorMessage = error ? <ErrorMessage /> : null,
            spinner = loading ? <Spinner /> : null,
            content = !(error || loading) ? items : null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ 'display': charEnd ? 'none' : 'block' }} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;
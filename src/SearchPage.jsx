import React, {useState, useEffect} from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

const SearchPage = (props) => {
    const { shelves, books, updateList} = props;
    const [query, setQuery] = useState('');
    const [resultBooks, setResultBooks] = useState([]);

    useEffect(() => {
        if(query && query !== ''){
            BooksAPI.search(query).then(data => {
                if (data && !data.hasOwnProperty('error')){
                    setResultBooks(data.filter(b => {
                        books.forEach(book => {
                            if(book.id === b.id){
                                b.shelf = book.shelf;
                            }
                        })
                        return (b.hasOwnProperty('imageLinks') 
                        && b.imageLinks.hasOwnProperty('thumbnail') 
                        && b.hasOwnProperty('authors'));
                    }));
                } else setResultBooks([]);
            });
        } else setResultBooks([]);
    }, [query, books]);

    return (
    <div className="search-books">
        <div className="search-books-bar">
            <Link className="close-search" to="/"/>
            <div className="search-books-input-wrapper">
                <input 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text" 
                    placeholder="Search by title or author"/>        
            </div>
        </div>
        <div className="search-books-results">
            <BookShelf
                books={resultBooks}
                shelves={shelves}
                update={(book, target) => {
                    updateList(book, target); 
                    setQuery(query);}}/>
        </div>
    </div>
    );
}

export default SearchPage;
